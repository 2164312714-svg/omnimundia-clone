import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "剧本大全",
  description: "探索海量 AI 推演剧本，悬疑、奇幻、克苏鲁……每一个世界都由 AI 实时推演。",
};

export default function ScriptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
