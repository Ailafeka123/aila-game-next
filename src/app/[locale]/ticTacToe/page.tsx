
import { useTranslations } from "next-intl";

import { Metadata } from "next";
import { siteMetaData } from "@/config/metadata";

import TicTacToeGame from "@/component/TicTacToe/TicTacToe";

type Props = {
  params: Promise<{ locale: "en" | "zh" }>;
};
export async function generateMetadata({ params }: Props){
    const { locale }  = await params;
    const meta = siteMetaData.ticTacToe[locale] || siteMetaData.ticTacToe.zh;
    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
        title: meta.title,
        description: meta.description,
        },
    };
}


export default function TicTacToe(){
    const t = useTranslations("ticTacToe");

    return (
        <main className="">
            <article className="flex flex-col items-center  justify-around">
                <header className="w-full m-[16px]  text-center">
                    <h2 className="text-xl">{t("title")}</h2>
                </header>
                <section className=" w-full h-full flex flex-col md:flex-row-reverse items-center md:items-start justify-around">
                    
                    <div className="flex-1/2 text-center flex flex-col items-start justify-start gap-[8px] mb-[16px]">
                        <h3 className="text-lg m-[8px]">{t("descriptionTitle")}</h3>
                        <div className="flex flex-col gap-[8px] items-start w-auto text-start px-[8px]">
                            <p className="">
                                {t("description1")}
                            </p>
                            <p className="">
                                {t("description2")}
                            </p>
                            <p className="">
                                {t("description3")}
                            </p>
                            <p className="">
                                {t("description4")}
                            </p>
                            <p className="">
                                {t("description5")}
                            </p>
                        </div>
                    </div>
                    <div className="md:flex-1/2 w-full md:w-auto">
                        <TicTacToeGame/>
                    </div>
                </section>
            </article>
        </main>
    )
}