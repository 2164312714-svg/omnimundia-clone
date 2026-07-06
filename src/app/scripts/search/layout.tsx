import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "搜索剧本",
  description: "按关键词、标签、类型搜索海量 AI 推演剧本。",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
