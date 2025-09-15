import type { Metadata,Viewport } from "next";
import { DarkModeProvider } from "@/context/DarkModeContext";

export const metadata: Metadata = {
  title: "Aila-GameWeb ",
  description: "使用Next製作小遊戲網站，目前擁有貪吃蛇與井字遊戲，利用i18n多語言的功能，",
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
    description:"使用Next製作小遊戲網站，目前擁有貪吃蛇與井字遊戲，利用i18n多語言的功能，",
    locale:"zh",
    type:"website",
  },
};
export const viewport : Viewport = {
  width:"device-width",
  initialScale:1,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
    </>
  );
}