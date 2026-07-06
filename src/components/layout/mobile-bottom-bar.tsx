"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Clock, Heart, Info, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { useModal } from "@/hooks/use-modal";

const bottomBarItems = [
  { key: "scripts", label: "剧本", path: "/scripts", icon: BookOpen },
  { key: "recentPlayed", label: "最近", path: "/recent-played", icon: Clock },
  { key: "create", label: "创作", path: "/my-scripts", icon: Plus, isCenter: true },
  { key: "myScripts", label: "我的", path: "/my-scripts", icon: Heart },
  { key: "about", label: "关于", path: "/about", icon: Info },
];

export function MobileBottomBar() {
  const pathname = usePathname();
  const { isLoggedIn } = useUser();
  const { showModal } = useModal();

  const activeNav = (() => {
    if (pathname?.startsWith("/scripts")) return "scripts";
    if (pathname?.startsWith("/recent-played")) return "recentPlayed";
    if (pathname?.startsWith("/my-scripts")) return "myScripts";
    if (pathname?.startsWith("/about")) return "about";
    return "";
  })();

  return (
    <nav
      className="fixed left-2 right-2 z-[1000] grid grid-cols-5 items-center gap-1 rounded-[18px] border p-1 md:hidden"
      style={{
        bottom: "calc(8px + env(safe-area-inset-bottom))",
        height: "var(--app-mobile-bottom-bar-height)",
        backgroundColor: "var(--app-bg-card)",
        borderColor: "var(--app-border-l1)",
        boxShadow: "var(--app-shadow-popover)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      aria-label="底部导航"
    >
      {bottomBarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.key || (item.key === "myScripts" && pathname?.startsWith("/my-scripts") && item.label === "我的");

        const handleClick = (e: React.MouseEvent) => {
          if (item.isCenter && !isLoggedIn) {
            e.preventDefault();
            showModal("auth");
          }
        };

        return (
          <Link
            key={item.key}
            href={item.path}
            onClick={handleClick}
            className={cn(
              "press-feedback flex flex-col items-center justify-center gap-0.5 rounded-[14px] py-1 no-underline transition-all duration-200",
              isActive
                ? "bg-app-theme-fade text-app-theme font-semibold"
                : "text-app-text-l4 hover:text-app-text-l3"
            )}
            style={
              item.isCenter
                ? {
                    backgroundColor: "var(--app-color-theme)",
                    color: "var(--app-color-secondary)",
                    minHeight: "40px",
                  }
                : { minHeight: "40px" }
            }
          >
            <Icon className={cn("h-5 w-5", item.isCenter && "h-6 w-6")} />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
