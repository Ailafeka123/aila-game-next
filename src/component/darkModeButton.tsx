"use client"

import { useState,useEffect,useRef } from "react"
// 引入光暗icon
import Image from "next/image";

type updateDarkMode = {
    onDarkMode:(value:boolean) => void,
}
export default function DarkModeButton({onDarkMode}:updateDarkMode){
    // true = 暗色 false = 亮色
    const [darkMode,setDarkMode] = useState<boolean>(false);
    // 動畫冷卻 true = 冷卻完畢
    const changeColdDown = useRef<boolean>(true);
    // 切換光暗模式
    const clickChangeMode = () =>{
        // 如果是暗色 轉換成亮色 反之依樣
        if(changeColdDown.current === false) return;
        changeColdDown.current = false;
        if(darkMode){
            setDarkMode(false);
        }else{
            setDarkMode(true);
        }
        document.documentElement.classList.toggle('dark');
        // 動畫執行500毫秒完畢
        setTimeout(()=>{
            changeColdDown.current = true;
        },500)
    }
    // 初始化
    useEffect(()=>{
        const nowDark:boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(nowDark){
            setDarkMode(true);
            document.documentElement.classList.toggle('dark');
        }
    },[])
    // 更新到父層
    useEffect(()=>{
        onDarkMode(darkMode);
    },[darkMode])
    return (
    <div className={`bg-gray-200 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-950 dark:text-white
        border-4 border-gray-400 dark:border-gray-700 m-0 overflow-hidden w-[40px] h-[40px]
        rounded-md relative
    `}>
        <button className={`size-20
        transition duration-500 ease-in-out cursor-pointer
        flex flex-row items-center justify-between absolute -top-[4px] -left-[4px]
        px-[10px] rotate-180 dark:rotate-0
        w-[80px] h-[40px]`}
        type="button"
        onClick={()=>{clickChangeMode()}}>
            <Image src="/component/darkMode/darkMode_lightIcon.svg" height={20} width={20} alt="change LightMode Icon"></Image>
            <Image src="/component/darkMode/darkMode_DarkIcon.svg" className="rotate-180" height={20} width={20} alt="change darkMode Icon"></Image>
        </button>
    </div>)
}