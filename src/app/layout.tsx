import type { Metadata,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
