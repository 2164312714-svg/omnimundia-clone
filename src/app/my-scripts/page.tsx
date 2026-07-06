import { Heart, Plus } from "lucide-react";
import { ScriptCard } from "@/components/scripts/script-card";
import { Button } from "@/components/ui/button";
import { mockMyScripts } from "@/lib/mock-data";

export default function MyScriptsPage() {
  const publishedScripts = mockMyScripts.filter((s) => s.playerCount > 0);
  const draftScripts = mockMyScripts.filter((s) => s.playerCount === 0);

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-app-theme" />
          <h1 className="text-xl font-semibold text-app-text-l1">我的剧本</h1>
        </div>
        <Button className="bg-app-theme text-app-secondary hover:bg-app-theme">
          <Plus className="h-4 w-4" />
          新建剧本
        </Button>
      </div>

      {/* 已发布 */}
      {publishedScripts.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-app-text-l2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            已发布
          </h2>
          <div
            className="rounded-lg border p-6"
            style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l1)" }}
          >
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {publishedScripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 草稿 */}
      {draftScripts.length > 0 && (
        <section>
          <h2 className="mb-3 text-app-text-l2" style={{ fontSize: "1rem", fontWeight: 600 }}>
            草稿
          </h2>
          <div
            className="rounded-lg border p-6"
            style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l1)" }}
          >
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {draftScripts.map((script) => (
                <ScriptCard key={script.id} script={script} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
