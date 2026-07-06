"use client";

import { type ReactNode } from "react";
import { TopBar } from "./top-bar";
import { MobileBottomBar } from "./mobile-bottom-bar";
import { ModalRenderer } from "@/components/shared/modal-renderer";
import { OmiChatWidget } from "@/components/omi/omi-chat-widget";

/** 应用外壳 — 对应原站 layout-shell + app-content */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen min-h-0 flex-col">
      <TopBar />
      <main
        className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-[50px]"
        style={{ paddingBottom: "calc(var(--app-mobile-bottom-bar-height) + 24px + env(safe-area-inset-bottom))" }}
      >
        {children}
      </main>
      <MobileBottomBar />
      <ModalRenderer />
      <OmiChatWidget />
    </div>
  );
}
