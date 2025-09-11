"use client";
import { useState, useEffect, useCallback } from "react";
import PhoneSmooth from "@/component/PhoneSmooth";
export default function SnakeGame(){
    // 遊戲狀態 false = 關閉
    const [gameState, setGameState] = useState<boolean>(false);
    // 
    const [gameMap , setGameMap] = useState<(0|1|2)[]> ([])


    // 手機板監控 啟動
    const [phoneControl , setPhoneControl] = useState<boolean>(true);
    // 貪吃蛇方向
    const [move,setMove] = useState<number>(0);
    // 開啟的話 啟動監聽(電腦版)
    useEffect(()=>{
        if(gameState === false) return;

        return(()=>{

        })
    },[gameState])
    return (
    <div className="flex flex-col items-center justify-start w-full gap-[8px]">
        <h2>這裡是snakeGame</h2>
        <div className=" grid aspect-square w-full  md:w-[400px] md:h-[400px] bg-white dark:bg-gray-800">

        </div>
        <PhoneSmooth useBoolean={phoneControl} moveState={0} onMove = {setMove} />
        {/* <div className={`absolute`}>
            <h2>Game Over</h2>
        </div> */}
    </div>)
}