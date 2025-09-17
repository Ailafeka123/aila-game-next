"use client";
import { useState,useEffect } from "react";
export default function LoadingComponent(){
    // 整體畫面
    const [loading,setLoading]= useState<boolean>(false);
    const [move , setMove] = useState<boolean>(false);
    // 物件轉動
    const [walking , setWalking] = useState<boolean>(false);

    // 動畫的思考
    // loading => loading:fasle move:false
    // loading完成 => loading:true 觸發move 
    // move結束 
    // 切換視窗
    // loading => 變回 false  觸發move
    // 這兩著之間 可能會小於500 所以暫時放棄
    // laoding完成 變回true 觸發move

    useEffect(()=>{
        setMove(true);
    },[loading])

    useEffect(()=>{
        if(move === false) return ;
        setTimeout(()=>{
            setLoading(true)
            setMove(false)
        },500)
    },[move])

    useEffect(()=>{
        // 加仔完成就不需要動了
        if(loading)return ;
        setTimeout(()=>{
            setWalking(index=>{return !index})
        },500)
    },[walking])
    return(
        <div className={`fixed w-svw h-svh top-0 left-0 bg-amber-400  z-1000  
        transition duration-500 ease-in-out origin-top-right ${move?" rotate-180":"rotate-0"}
        ${loading ? "hidden" : "flex"}  items-center justify-center
        `} >
            <div className={` border-8 max-w-[300px] w-1/2 aspect-square bg-white dark:bg-gray-900 text-white dark:text-gray-900
                transition  ease-in-out ${walking ? " rotate-90 duration-500": "rotate-0 duration-0"}` }>
            </div>
        </div>
    )
}