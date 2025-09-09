"use client"

import { useState, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
// 轉換語系
export default function LangChange(){
    // 切換路徑
    const locale = useLocale();
    // 由於改用Link 所以不需要用這個轉跳了
    // const router = useRouter();
    const pathName = usePathname();
    // 轉換語言 (後續改用Link)
    // const switchLocale = (newLocale:string) =>{
    //     if(newLocale !== locale){
    //         router.replace(pathName,{locale: newLocale});
    //         router.refresh;
    //     }
    // }
    // 開關
    const [openLang, setOpenLang] = useState<boolean>(false);
    const openColdDown = useRef<boolean>(true);
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
                transition duration-500 ease-in-out md:duration-0
            "
                onClick={()=>{SwithLangOpen()}}>語系
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