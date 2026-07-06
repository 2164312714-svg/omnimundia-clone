"use client";

import { useState, useMemo } from "react";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScriptCard } from "@/components/scripts/script-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchScripts, sortOptions } from "@/lib/mock-data";

export default function ScriptSearchPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [sortBy, setSortBy] = useState("hot");

  const results = useMemo(() => {
    let scripts = searchScripts(submittedQuery);
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
  }, [submittedQuery, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}>
      {/* 移动端搜索顶栏占位 */}
      <div className="mb-4 flex items-center gap-2">
        <Link href="/scripts" className="md:hidden">
          <Button variant="ghost" size="icon" className="text-app-text-l3">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-app-text-l1">搜索剧本</h1>
      </div>

      {/* 搜索工具栏 */}
      <form
        onSubmit={handleSearch}
        className="mb-4 flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索剧本名、标签或作者"
            className="rounded-lg pl-10"
            style={{
              backgroundColor: "var(--app-bg-l2)",
              borderColor: "var(--app-border-l2)",
            }}
          />
        </div>
        <Button type="submit" className="rounded-lg bg-app-theme px-4 text-app-secondary">
          搜索
        </Button>
      </form>

      {/* 排序栏 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                sortBy === opt.value
                  ? "font-semibold text-app-theme"
                  : "text-app-text-l4 hover:text-app-text-l1"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {submittedQuery && (
          <span className="text-sm text-app-text-l4">
            搜索"{submittedQuery}" · {results.length} 个结果
          </span>
        )}
      </div>

      {/* 搜索结果 */}
      {results.length > 0 ? (
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--app-bg-l2)",
            borderColor: "var(--app-border-l1)",
          }}
        >
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {results.map((script) => (
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
          <Search className="h-12 w-12 text-app-text-l6" />
          <p className="mt-4 text-app-text-l4">没有我喜欢的剧本</p>
          <p className="mt-1 text-sm text-app-text-l5">试试其他关键词</p>
        </div>
      )}
    </div>
  );
}
