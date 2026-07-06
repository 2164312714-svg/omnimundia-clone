import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description: "Omnimundia 是一个 AI 实时推演的互动剧本平台，让每一个故事都拥有无限可能。",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
