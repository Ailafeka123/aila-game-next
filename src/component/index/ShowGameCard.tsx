"use client";

import { useState,useEffect,useContext } from "react";
import { DarkModeContext } from "@/context/DarkModeContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function ShowGameCard(){
    // 檢測光暗模式
    const {darkModeContext} = useContext(DarkModeContext)
    // 抓取翻譯
    const t = useTranslations("index")
    const  cards = t.raw("cards") as { slug:string, gameName: string; description: string ,gameImgLight:string, gameImgDark:string, more:string}[];
    // 翻面控制 避免翻來翻去
    const [cardHover,setCardHover] = useState<boolean[]>([]);
    useEffect(()=>{
        if(cards){
            const temp = Array(cards.length).fill(false);
            setCardHover(temp);
        }
    },[])

    const cardHoverFunc = (num:number) =>{
        setCardHover(index=>{
            const temp = [...index];
            temp[num] = true;
            return temp;
        })
    
    }
    const cardLeaveFunc = (num:number)=>{
        setCardHover(index=>{
            const temp = Array(index.length).fill(false);
            return temp;
        })
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto w-full ">
            {cards.map((card,key:number) => (
                
                <Link key={card.slug} href={`${card.slug}`}>
                    <div key={`${card.gameName}-Card`}  onMouseEnter={() => cardHoverFunc(key) } onMouseLeave={() => cardLeaveFunc(key)}>                    
                        <div key={`${card}-${key}`} className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${ cardHover[key] ? "md:[transform:rotateY(180deg)] " : ""}   bg-white dark:bg-gray-800 shadow border rounded-md`}>
                            
                            <div key={`${card}-${key}-front`} className="relative backface-hidden w-full h-full p-[8px] flex flex-col items-center justify-center text-center ">
                                <img src={darkModeContext?card.gameImgDark:card.gameImgLight} className="aspect-square"></img>
                            </div>

                            <div key={`${card}-${key}-backface`} className=" md:absolute md:backface-hidden md:[transform:rotateY(180deg)]  w-full h-full top-0 left-0 p-[8px]">
                                <div className="relative w-full h-full flex flex-col gap-[8px]">
                                    <h2>{card.gameName}</h2>
                                    <p>{card.description}</p>
                                    <p className="md:absolute bottom-0 right-0 text-right">{card.more}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link> 
            ))}
        </div>
    )
}
