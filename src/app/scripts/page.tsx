"use client";

import { useState, useMemo } from "react";
import { Search, Flame, Sparkles, TrendingUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScriptCard } from "@/components/scripts/script-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  scriptCategories,
  sortOptions,
  carouselBanners,
  getScriptsByCategory,
} from "@/lib/mock-data";

const sortIcons: Record<string, typeof Flame> = {
  hot: Flame,
  new: Sparkles,
  rating: TrendingUp,
  discussion: MessageCircle,
};

const PAGE_SIZE = 8;

export default function ScriptSelectionPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<string>("hot");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredScripts = useMemo(() => {
    const scripts = getScriptsByCategory(activeCategory);
    // 排序
    const sorted = [...scripts];
    switch (sortBy) {
      case "hot":
        sorted.sort((a, b) => b.playerCount - a.playerCount);
        break;
      case "new":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        sorted.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "discussion":
        sorted.sort((a, b) => b.commentCount - a.commentCount);
        break;
    }
    return sorted;
  }, [activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredScripts.length / PAGE_SIZE);
  const paginatedScripts = filteredScripts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const activeCategoryLabel = scriptCategories.find((c) => c.key === activeCategory)?.label ?? "全部";

  return (
    <div
      className="mx-auto w-full"
      style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}
    >
      {/* 轮播 Banner */}
      <div className="mb-4 overflow-hidden rounded-lg" style={{ backgroundColor: "var(--app-bg-l3)" }}>
        <Carousel opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {carouselBanners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div
                  className="relative flex aspect-[9/2] items-center justify-center p-8 text-center"
                  style={{ background: banner.gradient }}
                >
                  <div className="z-10 text-white">
                    <h2 className="text-2xl font-bold drop-shadow-lg md:text-3xl">{banner.title}</h2>
                    <p className="mt-2 text-sm font-medium opacity-90">{banner.subtitle}</p>
                    <p className="mt-1 text-xs opacity-75">{banner.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* 分类栏 */}
      <div
        className="mb-4 flex items-center gap-2 rounded-lg border p-2"
        style={{
          backgroundColor: "var(--app-bg-l2)",
          borderColor: "var(--app-border-l1)",
        }}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1">
          {scriptCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                activeCategory === cat.key
                  ? "font-semibold text-app-theme"
                  : "text-app-text-l4 hover:text-app-text-l1"
              )}
              style={
                activeCategory === cat.key
                  ? { backgroundColor: "var(--app-color-theme-fade)" }
                  : undefined
              }
            >
              {cat.label}
              <span className="ml-1 text-xs opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* 搜索入口 */}
        <Link href="/scripts/search">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-app-theme"
            aria-label="搜索剧本"
          >
            <Search className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 排序栏 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {sortOptions.map((opt) => {
            const Icon = sortIcons[opt.value] ?? Flame;
            return (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors",
                  sortBy === opt.value
                    ? "font-semibold text-app-theme"
                    : "text-app-text-l4 hover:text-app-text-l1"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
        <span className="text-sm text-app-text-l4">
          {activeCategoryLabel} · {filteredScripts.length} 个剧本
        </span>
      </div>

      {/* 剧本列表容器 */}
      {paginatedScripts.length > 0 ? (
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--app-bg-l2)",
            borderColor: "var(--app-border-l1)",
          }}
        >
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {paginatedScripts.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-20 text-center"
          style={{
            backgroundColor: "var(--app-bg-l2)",
            borderColor: "var(--app-border-l1)",
          }}
        >
          <p className="text-app-text-l4">没有找到相关剧本</p>
          <p className="mt-1 text-sm text-app-text-l5">没有符合条件的剧本，换个组合试试</p>
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "cursor-pointer rounded-md px-3 py-1 text-sm transition-colors",
                      currentPage === page
                        ? "font-semibold text-app-secondary"
                        : "text-app-text-l4 hover:bg-app-bg-l7"
                    )}
                    style={
                      currentPage === page
                        ? { backgroundColor: "var(--app-color-theme)" }
                        : undefined
                    }
                  >
                    {page}
                  </button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
