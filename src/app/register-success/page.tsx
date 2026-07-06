import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterSuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-xl border p-8 text-center"
        style={{
          backgroundColor: "var(--app-bg-l4)",
          borderColor: "var(--app-border-l1)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--app-color-green-fade)" }}
        >
          <CheckCircle2 className="h-7 w-7 text-app-green" />
        </div>
        <h1 className="text-lg font-semibold text-app-text-l1">注册成功</h1>
        <p className="mt-2 text-sm text-app-text-l3">
          邮箱验证成功，已为你自动登录。
        </p>
        <Link href="/scripts">
          <Button className="mt-4 bg-app-theme text-app-secondary">
            开始探索
          </Button>
        </Link>
      </div>
    </div>
  );
}
