// import Image from "next/image";

// import { useTranslation } from 'react-i18next';
import { useTranslations } from "next-intl";

export default function Home() {
  // const { t } = useTranslation('common');
  const t = useTranslations("index")

  return (
    <main className="font-sans bg-white dark:bg-gray-900 text-gray-950 dark:text-white
    flex flex-col items-center justify-items-center 
    min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <h2 >{t("title")}</h2>
      </div>
    </main>
  );
}
