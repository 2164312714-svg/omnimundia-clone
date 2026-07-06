import { KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-xl border p-8"
        style={{
          backgroundColor: "var(--app-bg-l4)",
          borderColor: "var(--app-border-l1)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--app-color-theme-fade)" }}
          >
            <KeyRound className="h-6 w-6 text-app-theme" />
          </div>
          <h1 className="text-lg font-semibold text-app-text-l1">重置密码</h1>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-app-text-l2">新密码</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="请输入新密码"
              style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-app-text-l2">确认新密码</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="请再次输入新密码"
              style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
            />
          </div>
          <Button type="submit" className="w-full bg-app-theme text-app-secondary">
            确认重置
          </Button>
        </form>
      </div>
    </div>
  );
}
