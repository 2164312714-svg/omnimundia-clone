import { ScriptEditor } from "@/components/editor/script-editor";

export default async function MyScriptDetailPage({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const { scriptId } = await params;

  return <ScriptEditor scriptId={scriptId} />;
}
