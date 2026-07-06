"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Clock, Heart, Info, PenSquare, Moon, Sun, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useTheme } from "@/hooks/use-theme";
import { useUser } from "@/hooks/use-user";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { key: "scripts", label: "剧本大全", path: "/scripts", icon: BookOpen },
  { key: "recentPlayed", label: "最近玩过", path: "/recent-played", icon: Clock },
  { key: "myScripts", label: "我的剧本", path: "/my-scripts", icon: Heart },
  { key: "about", label: "关于我们", path: "/about", icon: Info },
];

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isLoggedIn } = useUser();
  const { showModal } = useModal();

  // 判断当前激活的导航项
  const activeNav = (() => {
    if (pathname?.startsWith("/scripts")) return "scripts";
    if (pathname?.startsWith("/recent-played")) return "recentPlayed";
    if (pathname?.startsWith("/my-scripts")) return "myScripts";
    if (pathname?.startsWith("/about")) return "about";
    return "";
  })();

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[1000] flex h-[50px] shrink-0 items-center justify-between border-b px-6"
      style={{
        backgroundColor: "var(--app-bg-topbar)",
        borderColor: "var(--app-border-l1)",
      }}
    >
      {/* 左侧：Logo + 导航 */}
      <div className="flex items-center gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.key;
            return (
              <Link
                key={item.key}
                href={item.path}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm transition-colors no-underline",
                  isActive
                    ? "font-semibold text-app-theme"
                    : "text-app-text-l4 hover:text-app-text-l1"
                )}
                style={isActive ? { backgroundColor: "transparent" } : undefined}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 右侧：操作区 */}
      <div className="flex items-center gap-2">
        {/* 创作 */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden text-app-text-l3 hover:text-app-text-l1 sm:flex"
          onClick={() => isLoggedIn ? router.push("/my-scripts") : showModal("auth")}
        >
          <PenSquare className="h-4 w-4" />
          <span className="ml-1 text-sm">创作</span>
        </Button>

        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-app-text-l3 hover:text-app-text-l1"
          onClick={toggleTheme}
          aria-label="切换主题"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        {/* 钱包 */}
        {isLoggedIn ? (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-app-text-l3 hover:text-app-text-l1"
            onClick={() => showModal("recharge")}
          >
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-semibold text-app-theme">{user.credits}</span>
          </Button>
        ) : null}

        {/* 用户头像 / 登录注册 */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center rounded-full border p-0.5 transition-opacity hover:opacity-80" style={{ borderColor: "var(--app-border-l2)" }}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-app-bg-l4 text-app-text-l2 text-xs font-semibold">
                    {user.nickname.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-app-text-l1">{user.nickname}</p>
                <p className="truncate text-xs text-app-text-l4">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => showModal("accountSettings")}>
                账号设置
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => showModal("recharge")}>
                补充积分
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => showModal("invite")}>
                邀请好友
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={logout}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-app-text-l3 hover:text-app-text-l1"
              onClick={() => showModal("auth")}
            >
              登录
            </Button>
            <Button
              size="sm"
              className="bg-app-theme text-app-secondary hover:bg-app-theme"
              onClick={() => showModal("auth")}
            >
              注册
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
