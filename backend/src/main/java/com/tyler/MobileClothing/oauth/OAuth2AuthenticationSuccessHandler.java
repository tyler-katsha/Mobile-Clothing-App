package com.tyler.MobileClothing.oauth;

import com.tyler.MobileClothing.enums.AuthProvider;
import com.tyler.MobileClothing.enums.Role;
import com.tyler.MobileClothing.jwts.JwtTokenProvider;
import com.tyler.MobileClothing.user.User;
import com.tyler.MobileClothing.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Instant;
import java.util.Set;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;

    private final UserRepository userRepository;

    @Value("${mobileUrl}")
    private String mobileUrl;

    @Override
    public void onAuthenticationSuccess(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Authentication authentication) throws IOException, ServletException {

            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String email = oAuth2User.getAttribute("email");

            if (email == null || email.isBlank()) {
                handleExceptionRedirect(request, response);
                return;
            }

            String name = oAuth2User.getAttribute("name");

            User user = userRepository.findByEmail(email)
                    .map(existingUser -> {

                        if (name != null && !name.isBlank()) {
                            existingUser.setName(name);
                        }

                        existingUser.setEnabled(true);
                        existingUser.setUpdatedAt(Instant.now());

                        return userRepository.save(existingUser);
                    })
                    .orElseGet(() -> userRepository.save(
                            User.builder()
                                    .email(email)
                                    .name(name)
                                    .provider(AuthProvider.OAUTH)
                                    .isEnabled(true)
                                    .role(Set.of(Role.USER))
                                    .createdAt(Instant.now())
                                    .updatedAt(Instant.now())
                                    .build()
                    ));


            issueTokenAndRedirect(request, response, user);
    }

    private void issueTokenAndRedirect(HttpServletRequest request, HttpServletResponse response, User user) throws IOException {
        String token = tokenProvider.generateToken(user);

        String baseUrl =  mobileUrl +"/oauth2/redirect";
        String targetUrl = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("token", token)
                .build()
                .toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void handleExceptionRedirect(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // Redirect back to frontend login with an error query parameter instead of breaking the filter chain
        String targetUrl = UriComponentsBuilder.fromUriString("login").queryParam("error", "oauth_cancelled").build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}