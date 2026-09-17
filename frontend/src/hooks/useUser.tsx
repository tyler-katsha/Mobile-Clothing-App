import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {PartialUserProps, UserContextType, UserProps} from "@/app/types/User";
import {API} from "@/app/API/api";
import {authFetch} from "@/app/utils/client";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider= ({children} : {children: ReactNode}) => {
    const [user,setUser] = useState<null | UserProps>(null);
    const [isLoading,setIsLoading] = useState(false);

    const fetchUser = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(),8000); // 8 second timeout
        try {

            if (localStorage.getItem('login-register-pages') === 'true') {
                setIsLoading(false);
                return;
            }
            if (localStorage.getItem('email') === 'true') {
                setIsLoading(false);
                return;
            }

            const response = await authFetch(`${API}/users/me`,{
                signal: controller.signal
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();

            setUser(data);
        } catch (err) {
            console.error('fetchUser failed or timed out: ',err)
            setUser(null);
        } finally {
            clearTimeout(timeoutId);
            setIsLoading(false)
        }
    }

    const updateUser = async (newData: UserProps) => {
        setUser(newData);
        return newData;
    }
    const updatePartialUser = async (partUser: PartialUserProps) => {
        setUser(prev => {
            if(!prev) return null;

            return {...prev,partUser};
        })
    }
    const logout = async () => {
        try {
        } catch (error) {
            console.error('Logout failed:', error);
        }
        finally {
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, logout, fetchUser, setUser, updateUser, updatePartialUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within UserProvider')
    }
    return context;
}