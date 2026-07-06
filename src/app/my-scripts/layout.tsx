import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "我的剧本",
  description: "管理你创作和收藏的 AI 推演剧本，查看草稿与已发布作品。",
};

export default function MyScriptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
