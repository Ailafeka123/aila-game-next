"use client"
import { useState,useEffect } from "react"
export default function DarkModeButton(){
    // true = 暗色 false = 亮色
    const [darkMode,setDarkMode] = useState<boolean>(false);
    // 切換光暗模式
    const clickChangeMode = () =>{
        // 如果是暗色 轉換成亮色 反之依樣
        if(darkMode){
            setDarkMode(false);
        }else{
            setDarkMode(true);
        }
        document.documentElement.classList.toggle('dark');
    }
    // 初始化
    useEffect(()=>{
        const nowDark:boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(nowDark){
            setDarkMode(true);
            document.documentElement.classList.toggle('dark');
        }
    },[])
    return (
    <div className="">
        <button className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-950 dark:text-white
        transition duration-150 ease-in-out
        border-4 border-gray-400 dark:border-gray-700
        cursor-pointer p-2 rounded-md" 
        onClick={()=>{clickChangeMode()}}>
            切換光暗模式
        </button>
    </div>)
}