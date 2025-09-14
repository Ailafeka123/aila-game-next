import type { Metadata } from "next";
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

type Props = {
  params: { locale: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
   const { locale } = await params;
   return{
      openGraph:{
        locale:`${locale}`,
      },
   }
}

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