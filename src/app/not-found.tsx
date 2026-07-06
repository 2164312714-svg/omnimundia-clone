import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l3))" }}
      >
        <Compass className="h-8 w-8 text-app-theme" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-app-text-l1">404</h1>
        <p className="text-sm text-app-text-l4">
          你探索的页面不存在，或许尚未被世界线记录。
        </p>
      </div>
      <Link href="/scripts">
        <Button className="bg-app-theme text-app-secondary">
          回到剧本大全
        </Button>
      </Link>
    </div>
  );
}
