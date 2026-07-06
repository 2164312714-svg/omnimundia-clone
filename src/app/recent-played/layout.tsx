import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "最近游玩",
  description: "查看你最近游玩过的 AI 推演剧本，随时继续你的故事。",
};

export default function RecentPlayedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
