"use client"

import { useState, useRef, useContext, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DarkModeContext } from "@/context/DarkModeContext";
// 轉換語系
export default function LangChange(){
    // 切換路徑
    const locale = useLocale();
    const pathName = usePathname();
    // 抓取主題顏色
    const {darkModeContext} = useContext(DarkModeContext);
    // 開關
    const [openLang, setOpenLang] = useState<boolean>(false);
    const openColdDown = useRef<boolean>(true);
    // 導入語系
    const t = useTranslations("menu")

    // 開關選單
    const SwithLangOpen = () =>{
        if(openColdDown.current === false) return ;
        openColdDown.current = false;
        setOpenLang(!openLang);
        setTimeout(()=>{
            openColdDown.current = true;
        },500)
    }
    
    return (
        <div className="flex flex-col md:flex-row p-[8px] md:px-[8px] gap-[8px] items-center text-center w-svw md:w-auto">

            <button type="button" className="md:hidden w-svw hover:bg-gray-400 dark:hover:bg-gray-700 p-[8px] cursor-pointer rounded-md
                transition duration-500 ease-in-out md:duration-0 flex flex-row items-center justify-center gap-[8px]
            "
                onClick={()=>{SwithLangOpen()}}>{t("lang")}{  <img className={`transition duration-500 ease-in-out  ${openLang?"-rotate-x-180 ":""}`} src={`${darkModeContext?"/component/darkMode/Arrow_Dark":"/component/darkMode/Arrow_light"}.svg`} alt={`${openLang?"":""}`}></img>}
            </button>

            <ul className={`flex flex-col md:flex-row gap-[8px] overflow-hidden 
                transition-[height] duration-500 ease-in-out md:duration-0 md:h-auto
                ${openLang?"h-[90px]":"h-[0px]"} `
                }>
                <li className={` ${locale === "en" ? " text-gray-600 dark:text-gray-500 cursor-auto " :"hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"} 
                    flex items-center
                    p-[8px] w-svw md:w-auto h-full rounded-md `}>
                    <Link href={pathName} locale={"en"} className={`w-full h-full text-center ${locale === "en" ?"cursor-default":""} `}>English
                    </Link>
                </li>
                <li className={`${locale === "zh"?"text-gray-600 dark:text-gray-500 cursor-auto ":"hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"} 
                    p-[8px] w-svw md:w-auto  rounded-md`}>
                    <Link href={pathName} locale={"zh"} className={`w-full h-full text-center ${locale === "zh"?"cursor-default":""}`}>
                        中文
                    </Link>
                </li>
            </ul>
        </div>
    )
}