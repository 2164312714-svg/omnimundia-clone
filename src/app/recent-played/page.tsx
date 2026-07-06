"use client";

import { Clock, Play } from "lucide-react";
import { ScriptCard } from "@/components/scripts/script-card";
import { mockScripts } from "@/lib/mock-data";

export default function RecentPlayedPage() {
  // 模拟"最近玩过"——取前 6 个剧本
  const recentScripts = mockScripts.slice(0, 6);

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-app-theme" />
        <h1 className="text-xl font-semibold text-app-text-l1">最近玩过</h1>
      </div>

      {recentScripts.length > 0 ? (
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--app-bg-l2)",
            borderColor: "var(--app-border-l1)",
          }}
        >
          <div
            className="stagger grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {recentScripts.map((script) => (
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
          <Play className="h-12 w-12 text-app-text-l6" />
          <p className="mt-4 text-app-text-l4">在此剧本中你尚未留下任何足迹</p>
          <p className="mt-1 text-sm text-app-text-l5">去剧本大全找找看吧</p>
        </div>
      )}
    </div>
  );
}
