import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "审核管理",
  description: "剧本审核工作台，审核提交的剧本版本。",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
