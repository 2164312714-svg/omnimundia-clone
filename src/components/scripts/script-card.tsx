import Link from "next/link";
import { Heart, MessageCircle, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Script } from "@/lib/types";

/** 剧本封面渐变（无图片时的 fallback，对应原站 cover-fallback） */
function getCoverGradient(script: Script): string {
  // 根据剧本 ID 生成稳定的渐变
  const gradients = [
    "linear-gradient(180deg, #7b8088, #686d76 62%, #5e636c)",
    "linear-gradient(180deg, #d97706, #b0683b)",
    "linear-gradient(180deg, #4a5568, #2d3748)",
    "linear-gradient(180deg, #6b5b95, #5c4b7a)",
    "linear-gradient(180deg, #3c2712, #2a1b0a)",
    "linear-gradient(180deg, #5e636c, #3c434d)",
  ];
  const hash = script.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

interface ScriptCardProps {
  script: Script;
  className?: string;
  /** 移动端列表模式（行式，无边框圆角） */
  isListMode?: boolean;
}

/** 剧本卡片 — 对应原站 script-card */
export function ScriptCard({ script, className, isListMode = false }: ScriptCardProps) {
  const linkHref = `/game/${script.id}`;

  return (
    <Card
      className={cn(
        "group cursor-pointer p-3 transition-colors",
        isListMode
          ? "rounded-none border-x-0 first:border-t-0"
          : "hover:bg-app-bg-l5",
        className
      )}
      style={{
        backgroundColor: "var(--app-bg-card)",
        borderColor: "var(--app-border-l1)",
      }}
    >
      <Link href={linkHref} className="no-underline">
        <div className="flex items-start gap-3">
          {/* 封面 — 84×84 圆角，带底部渐变 scrim */}
          <div className="relative h-21 w-21 shrink-0 overflow-hidden rounded-lg" style={{ width: 84, height: 84 }}>
            {script.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={script.coverUrl} alt={script.title} className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-xs text-white/70"
                style={{ background: getCoverGradient(script) }}
              >
                {script.title.slice(0, 2)}
              </div>
            )}
            {/* 底部 scrim 渐变 + 游玩人数 */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{ height: "44%", background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.62))" }}
            />
            <span
              className="absolute bottom-1 left-1.5 right-1.5 z-10 text-xs font-semibold leading-tight"
              style={{ color: "rgba(255,255,255,0.94)", textShadow: "0 1px 2px rgba(0,0,0,0.72)" }}
            >
              {script.playerCount.toLocaleString()} 人游玩
            </span>
          </div>

          {/* 卡片主体 */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start gap-2">
              <h3 className="m-0 truncate text-base font-semibold text-app-text-l1">{script.title}</h3>
              {script.isEarlyAccess && (
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-app-theme-fade text-xs text-app-theme"
                >
                  <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                  早鸟
                </Badge>
              )}
            </div>

            <p className="mt-1 line-clamp-2 text-sm text-app-text-l3">{script.description}</p>

            {/* 标签 */}
            {script.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {script.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded px-1.5 py-0.5 text-xs"
                    style={{
                      backgroundColor: "var(--app-bg-l3)",
                      color: "var(--app-text-l4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 作者 */}
            <p className="mt-1 truncate text-xs text-app-text-l5">作者：{script.author}</p>
          </div>
        </div>

        {/* 卡片底部：点赞 + 评论 */}
        <div
          className="mt-3 flex items-center justify-end gap-2 border-t pt-3"
          style={{ borderColor: "var(--app-border-l1)" }}
        >
          <span className="flex items-center gap-1 text-xs text-app-text-l4">
            <Heart className={cn("h-3 w-3", script.isLiked && "fill-app-red text-app-red")} />
            {script.likeCount}
          </span>
          <span className="flex items-center gap-1 text-xs text-app-text-l4">
            <MessageCircle className="h-3 w-3" />
            {script.commentCount}
          </span>
          <span className="flex items-center gap-1 text-xs text-app-text-l4">
            <Users className="h-3 w-3" />
            {script.playerCount.toLocaleString()}
          </span>
        </div>
      </Link>
    </Card>
  );
}
