"use client";

import { useState } from "react";
import { Mail, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal";

export function ForgotPasswordModal() {
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) closeModal(); }}>
      <DialogContent
        className="max-w-md gap-0 border p-0"
        style={{
          backgroundColor: "var(--app-bg-l5)",
          borderColor: "var(--app-border-l2)",
          borderRadius: "8px",
        }}
      >
        <DialogClose className="absolute right-3 top-3 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4 text-app-text-l4" />
        </DialogClose>

        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center" style={{ fontSize: "1.5rem", color: "var(--app-text-l2)" }}>
            找回密码
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {sent ? (
            <div className="space-y-4 py-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l2))" }}>
                <Mail className="h-6 w-6 text-app-theme" />
              </div>
              <p className="text-app-text-l2">
                重置链接已发送至
              </p>
              <p className="font-medium text-app-theme">{email}</p>
              <p className="text-sm text-app-text-l5">
                请前往邮箱查收，链接有效期为 30 分钟
              </p>
              <Button
                type="button"
                onClick={closeModal}
                className="w-full bg-app-theme text-app-secondary hover:bg-app-theme"
              >
                知道了
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-app-text-l2">注册邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入注册邮箱"
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-app-theme text-app-secondary hover:bg-app-theme">
                发送重置链接
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
