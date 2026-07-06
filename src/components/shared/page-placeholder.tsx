import { Construction } from "lucide-react";

/** 占位页 — 用于尚未完整实现的路由 */
export function PagePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center rounded-lg border py-20 text-center"
      style={{
        backgroundColor: "var(--app-bg-l2)",
        borderColor: "var(--app-border-l1)",
        margin: "1.5rem 1rem",
      }}
    >
      <Construction className="h-12 w-12 text-app-text-l6" />
      <h1 className="mt-4 text-lg font-semibold text-app-text-l2">{title}</h1>
      <p className="mt-1 text-sm text-app-text-l4">{description}</p>
    </div>
  );
}
