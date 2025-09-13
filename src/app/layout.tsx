import { DarkModeProvider } from "@/context/DarkModeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
    </>
  );
}