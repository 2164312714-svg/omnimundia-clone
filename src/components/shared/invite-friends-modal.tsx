"use client";

import { useState } from "react";
import { X, Copy, Gift, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export function InviteFriendsModal() {
  const { closeModal } = useModal();
  const [copied, setCopied] = useState(false);
  const inviteCode = "OMNI-EXPLR-2164";
  const inviteLink = `https://omnimundia.com/register?ref=${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            邀请好友
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* 奖励说明 */}
          <div className="flex items-center gap-3 rounded-[14px] p-4" style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l2))" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "var(--app-color-theme)" }}>
              <Gift className="h-5 w-5 text-app-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-app-text-l1">邀请奖励</p>
              <p className="text-xs text-app-text-l4">好友注册并首次充值，双方各得 50 积分</p>
            </div>
          </div>

          {/* 邀请码 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-app-text-l2">专属邀请码</p>
            <div className="flex items-center justify-center rounded-[14px] border-2 border-dashed py-4" style={{ borderColor: "var(--app-color-theme)" }}>
              <span className="text-lg font-bold tracking-widest text-app-theme">{inviteCode}</span>
            </div>
          </div>

          {/* 邀请链接 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-app-text-l2">邀请链接</p>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1"
                style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
              />
              <Button
                type="button"
                onClick={handleCopy}
                className="bg-app-theme text-app-secondary hover:bg-app-theme"
              >
                <Copy className="mr-1 h-4 w-4" />
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
          </div>

          {/* 已邀请统计 */}
          <div className="flex items-center justify-center gap-2 text-sm text-app-text-l4">
            <Users className="h-4 w-4" />
            已邀请 3 位好友，成功 2 位
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
