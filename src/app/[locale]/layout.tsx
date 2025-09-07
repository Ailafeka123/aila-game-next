import type { Metadata,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/component/menu";
import Footer from "@/component/footer";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
// import { notFound } from "next/navigation";
import { redirect } from 'next/navigation';

// import { appWithTranslation } from 'next-i18next';
// import type { ReactNode } from 'react';
// import initTranslations from '@/i18n';

// export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'zh' }];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aila-GameWeb ",
  description: "使用Next製作小遊戲網站",
  keywords:["劉星緯","遊戲","Next"],
  icons:{
    icon:[
      {url:`/selficon/selficon.svg`,media: "(prefers-color-scheme: light)", type:`image/svg+xml`},
      {url:`/selficon/selficon_light.svg`,media: "(prefers-color-scheme: dark)", type:`image/svg+xml`}
    ],
  },
  authors:[{name:"劉星緯"}],
  creator:"劉星緯",
  openGraph:{
    title:"aila GameWeb",
    description:"使用Next製作的小遊戲網站",
    locale:"zh-TW",
    type:"website",
  },
};
export const viewport : Viewport = {
  width:"device-width",
  initialScale:1,
};
// export default 

//   Readonly<{
//     children: React.ReactNode;
// }>

export default async function RootLayout({
  children,
  params
  }:{
    children: React.ReactNode,
    params:Promise<{locale:string}>;
  } 
) {

  const {locale} = await params;

  console.log(`這裡是layout , locale = ${locale}`)
  console.log(hasLocale(routing.locales, locale));
  console.log(routing.locales);

  if(!hasLocale(routing.locales, locale)){
    redirect("/zh");
    // notFound();
  }


  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth `}
      >
        <NextIntlClientProvider>
          <Menu/>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// export default appWithTranslation(RootLayout);