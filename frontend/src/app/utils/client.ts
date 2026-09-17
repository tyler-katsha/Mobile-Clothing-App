import type { AuthTokens } from "@/app/types/auth";
import type { RateLimitResponse } from "@/app/types/error";
import {saveAuthTokens, tokenStorage} from "./tokenStorage";
import {API} from "@/app/API/api";

export class RateLimitError extends Error {
    readonly retryAfter: number;

    constructor(message = "Too many requests. Please slow down",retryAfter = 60) {
        super(message);

        this.name = "RateLimitError";
        this.retryAfter = retryAfter;

        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}

export async function getLoginErrorMessage(response: Response): Promise<string> {
    try {
        const data = (await response.clone().json()) as {
            message?: string;
        };

        if (
            typeof data.message === "string" &&
            data.message.trim()
        ) {
            return data.message;
        }
    } catch {
        // Response doesn't contain JSON.
    }

    if (response.status === 401) {
        return "Invalid email or password.";
    }

    if (response.status === 403) {
        return "You do not have permission to log in.";
    }

    if (response.status >= 500) {
        return "The server is currently unavailable. Please try again later.";
    }

    return "Unable to log in. Please check your details and try again.";
}


/**
 * Processes HTTP responses that require special handling.
 *
 * Currently handles:
 * - 429 Too Many Requests
 */
export async function processResponseStatus(
    response: Response
): Promise<void> {
    if (response.status !== 429) {
        return;
    }

    let retryAfter = getRetryAfterHeader(response);
    let message = "Too many requests. Please slow down";

    try {
        const data:RateLimitResponse = await response.clone().json();

        if (
            typeof data.retryAfter === "number" &&
            Number.isFinite(data.retryAfter)
        ) {
            retryAfter = data.retryAfter;
        }

        if (typeof data.message === "string" && data.message.trim()) {
            message = data.message;
        }
    } catch {
        // The response body may not contain JSON.
        // Header/default values are used instead.
    }

    throw new RateLimitError(message, retryAfter);
}

function getRetryAfterHeader(response: Response): number {
    const value = response.headers.get("Retry-After");

    if (!value) {
        return 60;
    }

    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
}

/**
 * Only one refresh request is allowed to run at a time.
 *
 * If several API calls receive 401 at the same time,
 * they all wait for this same promise.
 */
let refreshPromise: Promise<AuthTokens | null> | null = null;

async function refreshAccessToken(): Promise<AuthTokens | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = performTokenRefresh();

    try {
        return await refreshPromise;
    } finally {
        refreshPromise = null;
    }
}

async function performTokenRefresh(): Promise<AuthTokens | null> {
    const refreshToken = localStorage.getItem("refresh-token");

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${API}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
        });

        await processResponseStatus(response);

        if (!response.ok) {
            return null;
        }

        const newTokens = (await response.json()) as AuthTokens;

        if (!newTokens.accessToken || !newTokens.refreshToken) {
            return null;
        }

        saveAuthTokens(newTokens);

        return newTokens;
    } catch (error) {
        if (error instanceof RateLimitError) {
            throw error;
        }

        return null;
    }
}

/**
 * Performs an authenticated HTTP request.
 *
 * If the access token is expired:
 * 1. The request receives 401.
 * 2. A token refresh is attempted.
 * 3. The original request is retried once.
 *
 * The request is NEVER recursively passed through authFetch(),
 * preventing infinite refresh loops.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = new Headers(options.headers);

    const accessToken = tokenStorage.getTokens();

    if (accessToken) {
        headers.set(
            "Authorization",
            `Bearer ${accessToken}`
        );
    }

    let response = await fetch(url, {
        ...options,
        headers,
    });

    await processResponseStatus(response);

    if (response.status !== 401) {
        return response;
    }

    const newTokens = await refreshAccessToken();

    if (!newTokens) {
        handleAuthenticationFailure();

        return response;
    }

    headers.set(
        "Authorization",
        `Bearer ${newTokens.accessToken}`
    );

    // Retry exactly once.
    response = await fetch(url, {...options,headers,});

    await processResponseStatus(response);

    return response;
}

/**
 * Handles an authentication failure after token refresh failed.
 */
function handleAuthenticationFailure(): void {
    tokenStorage.clear();

    if (window.location.pathname !== "/login") {
        window.location.replace("/login");
    }
}

/**
 * Logs the user out from the backend and then clears
 * all local authentication state.
 */
export async function BigLogout(): Promise<void> {
    const accessToken = tokenStorage.getTokens();
    const familyId = localStorage.getItem("family-id");

    try {
        if (!accessToken || !familyId) {
            return;
        }

        const response = await fetch(`${API}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                familyId,
            }),
        });

        await processResponseStatus(response);
    } catch (error) {
        if (error instanceof RateLimitError) {
            console.warn("Logout request was rate limited:",error.message);
        }
    } finally {
        tokenStorage.clear();

        window.location.replace("/login");
    }
}
