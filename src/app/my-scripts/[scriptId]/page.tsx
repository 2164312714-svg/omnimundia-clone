import type { Metadata } from "next";
import { ScriptEditor } from "@/components/editor/script-editor";

export const metadata: Metadata = {
  title: "编辑剧本",
  description: "剧本编辑器，管理世界树、词条、事件与版本。",
};

export default async function MyScriptDetailPage({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const { scriptId } = await params;

  return <ScriptEditor scriptId={scriptId} />;
}
