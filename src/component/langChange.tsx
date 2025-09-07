"use client";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
// 轉換語系
export default function LangChange(){
    // 切換路徑
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();
    // 轉換語言
    const switchLocale = (newLocale:string) =>{
        if(newLocale !== locale){
            router.replace(pathName,{locale: newLocale});
            router.refresh;
        }
    }
    // 開關
    const [openLang, setOpenLang] = useState<boolean>(false);
    const openColdDown = useRef<boolean>(true);
    const SwithLangOpen = () =>{
        if(openColdDown.current === false) return ;
        openColdDown.current = false;
        setOpenLang(!openLang);
        setTimeout(()=>{
            openColdDown.current = true;
        },500)
    }


    return (
        <div className="flex flex-col md:flex-row p-[8px]  md:px-[8px] gap-[8px] items-center text-center w-svw md:w-auto">

            <button type="button" className="md:hidden w-svw hover:bg-gray-400 dark:hover:bg-gray-700 p-[8px] cursor-pointer rounded-md"
                onClick={()=>{SwithLangOpen()}}>語系
            </button>

            <ul className={`flex flex-col md:flex-row gap-[8px] overflow-hidden 
                transition duration-500 ease-in-out md:duration-0
                ${openLang?"h-[90px] md:h-auto":"h-[0px] md:h-auto"}`}>
                <li>
                    <button type="button" className={`${locale === "en"?"text-gray-600 dark:text-gray-500":"hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"} 
                    p-[8px] w-svw md:w-auto  rounded-md`}
                        onClick={()=>{switchLocale("en")}}>English
                    </button>
                    {/* <Link href={`/snake`}>英文
                    </Link> */}
                </li>
                <li>
                    <button type="button" className={`${locale === "zh"?"text-gray-600 dark:text-gray-500":"hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"} 
                    p-[8px] w-svw md:w-auto  rounded-md`}
                        onClick={()=>{switchLocale("zh")}}>中文
                    </button>
                </li>
            </ul>
        </div>
    )
}