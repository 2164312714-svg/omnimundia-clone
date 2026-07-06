import Link from "next/link";
import { cn } from "@/lib/utils";

/** Logo - 对应原站 logo-area + logo-lockup-image */
export function Logo({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <Link href="/scripts" className={cn("flex items-center gap-2 no-underline", className)}>
      {/* logo-icon: 用 SVG 模拟原站 logo（带 brand-glow drop-shadow） */}
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "linear-gradient(135deg, #646cff, #d97706)",
          boxShadow: "0 0 1rem rgba(100, 108, 255, 0.4)",
        }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 无限符号 Ω - 呼应 "Omnimundia" 的 "Omni" */}
          <path
            d="M6 16C3.79 16 2 14.21 2 12C2 9.79 3.79 8 6 8C8.21 8 10 9.79 10 12C10 14.21 8.21 16 6 16ZM18 16C15.79 16 14 14.21 14 12C14 9.79 15.79 8 18 8C20.21 8 22 9.79 22 12C22 14.21 20.21 16 18 16Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M10 12H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className={cn(
          "text-lg font-bold tracking-wide",
          variant === "dark" ? "text-app-text-l1" : "text-white"
        )}
        style={{
          backgroundImage: "linear-gradient(90deg, #ff4d4f, #4f7bff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 0.625rem rgba(80, 110, 255, 0.15)",
        }}
      >
        Omnimundia
      </span>
    </Link>
  );
}
