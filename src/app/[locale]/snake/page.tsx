import { useTranslations } from "next-intl";
import SnakeGame from "@/component/snake/SnakeGame";

export default function Sanke(){
    const t = useTranslations("snake");
    // const targets = t<string[]>>("targets", { returnObjects: true });
    return(
        <main>
            <article className="flex flex-col items-center  justify-around">
                <header className="w-full m-[16px]  text-center">
                    <h2 className="text-xl">{t("title")}</h2>
                </header>
                <section className=" w-full h-full flex flex-col md:flex-row-reverse items-center md:items-start justify-around">
                    
                    <div className="flex-1/2 text-center flex flex-col gap-[8px]">
                        <h3 className="text-lg m-[8px]">{t("descriptionTitle")}</h3>
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
                    </div>
                    <div className="flex-1/2 w-full md:w-auto">
                        <SnakeGame/>
                    </div>
                </section>
            </article>
        </main>
    )

}