// import Image from "next/image";

// import { useTranslation } from 'react-i18next';
import { useTranslations } from "next-intl";
import ShowGameCard from "@/component/index/ShowGameCard";

export default function Home() {
  // const { t } = useTranslation('common');
  const t = useTranslations("index")

  return (
    <main className="font-sans bg-white dark:bg-gray-900 text-gray-950 dark:text-white
    flex flex-col items-start justify-items-center 
    w-full md:w-10/12
    min-h-screen p-8 pb-20 gap-16 ">
      <div className="flex flex-col gap-[8px] w-full">
        <h2 className="text-2xl" >{t("title")}</h2>
        <div className="">
          <p>{t("description")}</p>
        </div>

        <ShowGameCard/>
          

      </div>
    </main>
  );
}
