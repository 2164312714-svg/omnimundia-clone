"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("页面错误:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--app-color-red-fade)" }}
      >
        <AlertCircle className="h-8 w-8" style={{ color: "var(--app-color-red)" }} />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-app-text-l1">出了点问题</h1>
        <p className="text-sm text-app-text-l4">
          页面加载时发生错误，请重试或刷新页面。
        </p>
        {error.digest && (
          <p className="text-xs text-app-text-l5">错误代码：{error.digest}</p>
        )}
      </div>
      <Button onClick={reset} className="bg-app-theme text-app-secondary">
        <RotateCcw className="mr-2 h-4 w-4" />
        重试
      </Button>
    </div>
  );
}
