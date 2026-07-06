import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import { ModalProvider } from "@/hooks/use-modal";
import { UserProvider } from "@/hooks/use-user";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "Omnimundia — 无限可能的 AI 互动阅读平台",
  description: "超高自由度的推演。AI 驱动的互动阅读与创作平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <UserProvider>
            <ModalProvider>
              <AppShell>{children}</AppShell>
            </ModalProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
