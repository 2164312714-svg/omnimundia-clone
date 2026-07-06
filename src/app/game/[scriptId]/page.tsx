import { GamePlayer } from "@/components/game/game-player";

export default async function GamePage({
  params,
}: {
  params: Promise<{ scriptId: string }>;
}) {
  const { scriptId } = await params;

  return <GamePlayer scriptId={scriptId} />;
}
