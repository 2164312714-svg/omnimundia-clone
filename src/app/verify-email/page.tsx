import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
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
          style={{ backgroundColor: "var(--app-color-theme-fade)" }}
        >
          <MailCheck className="h-7 w-7 text-app-theme" />
        </div>
        <h1 className="text-lg font-semibold text-app-text-l1">邮箱验证</h1>
        <p className="mt-2 text-sm text-app-text-l3">
          注册成功，请前往邮箱验证后登录。
        </p>
      </div>
    </div>
  );
}
