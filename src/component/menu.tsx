"use client"
// 導入光暗切換按鈕
import DarkModeButton from "./darkModeButton"

import Image from "next/image";

import { useState, useRef } from "react"
import Link from "next/link";


export default function Menu(){
    // 從darkModeButton抓取是否為暗色模式
    const [darkMode,setDarkMode] = useState<boolean>(false);
    // 選單是否打開(手機板用) true = 打開 flase = 關閉
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
    // 選單開關冷卻 true = 冷卻完畢
    const openColdDown = useRef<boolean>(true)
    

    // 轉換開啟狀態
    const changeOpen = (state?:boolean) =>{
        if(openColdDown.current === false)return ;
        openColdDown.current = false;
        if(state !== undefined){
            setNavbarOpen(state);
        }else{
            if(navbarOpen === false){
                setNavbarOpen(true);
            }else{
                setNavbarOpen(false)
            }
        }
        setTimeout(()=>{
            openColdDown.current = true;
        })
    }
    return (
        // bg-gray-200 
        <header className={`bg-white dark:bg-gray-800 shadow text-gray-950 dark:text-white
        w-svw h-[var(--menuHeight)]
        fixed top-0 left-0 z-999
        flex flex-row items-center justify-start
        transition duration-500 ease-in-out
        px-[16px] md:p-0
        `}>
            <div className="flex items-center justify-center md:hidden">
                <Link href="/" onClick={()=>{changeOpen(false)}} >
                    <Image src={darkMode?"/selficon/selficon_light.svg":"/selficon/selficon.svg"} width={40} height={40} alt="icon"></Image>
                </Link>
            </div>

            <nav className={`bg-white dark:bg-gray-800 shadow
                w-full h-svh md:h-[var(--menuHeight)] fixed md:relative top-0 right-0 md:right-full md:translate-x-full
                flex flex-col md:flex-row  items-center justify-start md:justify-between gap-[8px] 
                p-2 md:px-8 mt-[var(--menuHeight)] md:m-0
                transition duration-500 ease-in-out md:duration-0
                ${navbarOpen?"translate-x-0 " : "translate-x-full"}`}
                 >
                <div className="flex items-center justify-center hidden md:block">
                    <Link href="/" onClick={()=>{changeOpen(false)}} >
                        <Image src={darkMode?"/selficon/selficon_light.svg":"/selficon/selficon.svg"} width={40} height={40} alt="icon"></Image>
                    </Link>
                </div>

                

                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-[8px]
                w-full md:w-auto ">
                    <ul className="flex flex-col md:flex-row  items-center gap-[8px]
                        w-full md:w-auto md:h-[var(--menuHeight)] 
                    ">
                        <li className="  hover:bg-gray-400 dark:hover:bg-gray-700 rounded-md cursor-pointer
                            flex items-center
                            p-[8px]
                            w-full md:w-auto md:h-1/2 ">
                                <Link href="/ticTacToe" className="w-full h-full text-center" onClick={()=>{changeOpen(false)}}>
                                    井字遊戲
                                </Link>
                        </li>
                       
                        <li className=" hover:bg-gray-400 dark:hover:bg-gray-700 rounded-md cursor-pointer
                                flex items-center
                                p-[8px]
                                w-full md:w-auto md:h-1/2 ">
                            <Link href="/snake" className="w-full h-full text-center" onClick={()=>{changeOpen(false)}}>
                                貪吃蛇
                            </Link>
                        </li>
                    </ul>
                    <DarkModeButton onDarkMode={setDarkMode}></DarkModeButton>
                </div>
            </nav>

            <div className=" bg-white shadow dark:bg-gray-800  hover:bg-gray-400 dark:hover:bg-gray-700
                    fixed md:hidden top-0 right-0 md:p-0 
                    h-[40px] w-[40px] -translate-x-1/2 translate-y-1/2 md:size-auto z-9999
                    border-4 border-gray-400 dark:border-gray-700
                ">
                <button className=" w-full h-full relative flex flex-col items-center  justify-around cursor-pointer overflow-hidden " type="button"  onClick={()=>{changeOpen()}}>
                    <div className={`w-4/5 bg-gray-950 dark:bg-white h-[2px] 
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition duration-500 ease-in-out
                        ${navbarOpen?"rotate-405":"rotate-0"} ` } ></div>

                        <div className={`w-4/5 bg-gray-950 dark:bg-white h-[2px] 
                    absolute top-1/2 left-1/2 -translate-x-1/2 
                    transition duration-500 ease-in-out
                        ${navbarOpen?"rotate-405 -translate-y-1/2":"rotate-0 -translate-y-[10px]"} ` } ></div>

                        <div className={`w-4/5 bg-gray-950 dark:bg-white h-[2px] 
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    transition duration-500 ease-in-out
                        ${navbarOpen?"rotate-495":"rotate-0 translate-y-[10px]"} ` } ></div>
                </button>
                    
            </div>
        </header>
    )
}