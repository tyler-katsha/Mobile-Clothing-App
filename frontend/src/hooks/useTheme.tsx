import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {darkTheme, lightTheme, ThemeContextType} from "@/app/types/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage is React Native's simple, promise-based API for persisting small bits
// of data on a user's device. Think of it as the mobile-app equivalent of the browser's localstorage
// but asynchronous and cross-platform

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({children} : {children: ReactNode}) => {
    const [isDarkMode,setIsDarkMode] = useState(false);

    useEffect(() => {
       AsyncStorage.getItem("darkMode")
           .then((value) => {
               if (value) setIsDarkMode(JSON.parse(value));
           })
    },[])

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;

        setIsDarkMode(newMode);
        await AsyncStorage.setItem("darkMode",JSON.stringify(newMode));
    };

    const colors = isDarkMode ? darkTheme : lightTheme;

    return(
        <ThemeContext.Provider value={{isDarkMode,toggleDarkMode,colors}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === undefined){
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context;
}

export default ThemeProvider