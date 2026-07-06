"use client";

import { X, MessageCircle, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";

export function OfficialGroupDialog() {
  const { closeModal } = useModal();

  const groups = [
    { name: "官方 QQ 群", id: "123456789", icon: Users, color: "var(--app-color-theme)" },
    { name: "官方 Discord", id: "Omnimundia#1234", icon: MessageCircle, color: "#5865F2" },
  ];

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
            加入官方社群
          </DialogTitle>
          <p className="text-center text-sm text-app-text-l5">
            与开发者和其他玩家交流
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.name}
                className="flex items-center gap-3 rounded-[14px] border p-4"
                style={{
                  borderColor: "var(--app-border-l2)",
                  backgroundColor: "var(--app-bg-l2)",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: g.color }}>
                  <Icon className="h-5 w-5 text-app-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-app-text-l1">{g.name}</p>
                  <p className="text-xs text-app-text-l4">群号/ID：{g.id}</p>
                </div>
              </div>
            );
          })}
          <p className="text-center text-xs text-app-text-l5">
            进群请备注 Omnimundia 用户昵称
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
