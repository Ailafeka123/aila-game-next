"use client";
import { useState, useEffect, createContext, ReactNode } from "react";

interface darkModeType {
    darkModeContext:boolean,
    setDarkModeContext : (value : boolean) => void,
    darkModeContextLoading:boolean,
}

export const DarkModeContext = createContext<darkModeType>({
    darkModeContext:false,
    setDarkModeContext:() => {},
    darkModeContextLoading:false
})

export function DarkModeProvider({children}:{children:ReactNode}){
    const [darkModeContext,setDarkModeContext] = useState<boolean>(false);
    const [darkModeContextLoading,setDarkModeContextLoading] = useState<boolean>(false)
    useEffect(() => {
        const saved:boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkModeContext(saved);
        setDarkModeContextLoading(true);
    }, []);
    return (
    <DarkModeContext.Provider value={{darkModeContext, setDarkModeContext, darkModeContextLoading}}>
        {children}
    </DarkModeContext.Provider>
    )
}