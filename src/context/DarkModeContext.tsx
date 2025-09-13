"use client";
import { useState, useEffect, createContext, ReactNode } from "react";

interface darkModeType {
    darkModeContext:boolean,
    setDarkModeContext : (value : boolean) => void
}

export const DarkModeContext = createContext<darkModeType>({
    darkModeContext:false,
    setDarkModeContext:() => {},
})

export function DarkModeProvider({children}:{children:ReactNode}){
    const [darkModeContext,setDarkModeContext] = useState<boolean>(false);
    useEffect(() => {
        const saved:boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkModeContext(saved);
    }, []);
    return (
    <DarkModeContext.Provider value={{darkModeContext, setDarkModeContext}}>
        {children}
    </DarkModeContext.Provider>
    )
}