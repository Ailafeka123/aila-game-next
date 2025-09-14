import { Metadata } from "next";
import { useTranslations } from "next-intl";
import SnakeGame from "@/component/snake/SnakeGame";
import { siteMetaData } from "@/config/metadata";

export async  function generateMetadata({params}: {params: { locale: "en"|"zh" } } ):Promise<Metadata>{
    
    const { locale }  = await params;
    const meta = siteMetaData.Snake[locale] || siteMetaData.Snake.zh;
    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
        title: meta.title,
        description: meta.description,
        },
    };
    
}


export default function Sanke(){
    const t = useTranslations("snake");
    // const targets = t<string[]>>("targets", { returnObjects: true });
    return(
        <main>
            {/* <article className="flex flex-col items-center justify-around"> */}
            <article className="grid grid-flow-row grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-2 gap-[16px]">
                <header className="md:col-span-2 m-[16px]  text-center">
                    <h2 className="text-xl">{t("title")}</h2>
                </header>
                <section className=" col-span-1 md:order-3 flex-1/2 text-center flex flex-col gap-[8px]">
                    <header>
                        <h3 className="text-lg m-[8px]">{t("descriptionTitle")}</h3>
                    </header>
                    <div className="flex flex-col gap-[8px] items-start w-auto text-start px-[8px] mb-[16px]">
                        <p>{t("Target")}</p>
                        <p>{t("Target1")}</p>
                        <p>{t("Target2")}</p>

                        <p>{t("game")}</p>
                        <p>{t("description1")}</p>
                        <p>{t("description2")}</p>
                        <p>{t("description3")}</p>

                        <p>{t("gameOver")}</p>
                        <p>{t("gameOver1")}</p>
                        <p>{t("gameOver2")}</p>
                    </div>
                </section>
                <section className=" col-span-1 flex flex-col items-center justify-start w-full gap-[8px]">
                    <SnakeGame/>
                </section>




                {/* <section className=" w-full h-full flex flex-col md:flex-row-reverse items-center md:items-start justify-around">
                    
                    
                    <div className="flex-1/2 w-full md:w-auto">
                        
                    </div>
                </section> */}
            </article>
        </main>
    )

}