import type { Metadata } from "next";
import { GamePlayer } from "@/components/game/game-player";

export const metadata: Metadata = {
  title: "剧本游戏",
  description: "沉浸式 AI 推演剧本游戏，与 AI 一起开启你的故事冒险。",
};

export default async function GamePage({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const { scriptId } = await params;

  return <GamePlayer scriptId={scriptId} />;
}
