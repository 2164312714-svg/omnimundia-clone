"use client";

import { useState } from "react";
import { X, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { rechargeProducts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function RechargeModal() {
  const { closeModal } = useModal();
  const [selectedId, setSelectedId] = useState<string>("p2");
  const [payMethod, setPayMethod] = useState<"alipay" | "wechat">("alipay");

  const selected = rechargeProducts.find((p) => p.id === selectedId);

  const handlePay = () => {
    // Mock: 直接关闭
    closeModal();
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) closeModal(); }}>
      <DialogContent
        className="max-w-lg gap-0 border p-0"
        style={{
          backgroundColor: "var(--app-bg-l5)",
          borderColor: "var(--app-border-l2)",
          borderRadius: "8px",
        }}
      >
        <DialogClose className="absolute right-3 top-3 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4 text-app-text-l4" />
        </DialogClose>

        <DialogHeader className="p-6 pb-3">
          <DialogTitle className="text-center" style={{ fontSize: "1.5rem", color: "var(--app-text-l2)" }}>
            充值 Omnicredits
          </DialogTitle>
          <p className="text-center text-sm text-app-text-l5">
            当前余额：<span className="font-medium text-app-theme">320</span> 积分
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          {/* 充值方案 */}
          <div className="grid grid-cols-2 gap-3">
            {rechargeProducts.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-[14px] border-2 p-4 transition-all",
                    isSelected ? "border-app-theme" : "border-app-border-l2"
                  )}
                  style={{
                    backgroundColor: isSelected ? "var(--app-color-theme-fade, var(--app-bg-l2))" : "var(--app-bg-l2)",
                  }}
                >
                  {p.isPopular && (
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] text-app-secondary"
                      style={{ backgroundColor: "var(--app-color-theme)" }}
                    >
                      热门
                    </span>
                  )}
                  {p.label && (
                    <span className="absolute right-2 top-2 text-[10px] text-app-theme">
                      {p.label}
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-app-theme" />
                    <span className="text-xl font-bold text-app-text-l1">{p.credits}</span>
                  </div>
                  <span className="mt-1 text-sm text-app-text-l3">积分</span>
                  <div className="mt-2 text-lg font-semibold text-app-theme">¥{p.price}</div>
                  {isSelected && (
                    <div className="absolute right-2 bottom-2 h-5 w-5 rounded-full bg-app-theme flex items-center justify-center">
                      <Check className="h-3 w-3 text-app-secondary" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 支付方式 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-app-text-l2">支付方式</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPayMethod("alipay")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-[12px] border-2 px-4 py-3 text-sm transition-all",
                  payMethod === "alipay" ? "border-app-theme text-app-theme" : "border-app-border-l2 text-app-text-l3"
                )}
                style={{ backgroundColor: "var(--app-bg-l2)" }}
              >
                支付宝
              </button>
              <button
                type="button"
                onClick={() => setPayMethod("wechat")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-[12px] border-2 px-4 py-3 text-sm transition-all",
                  payMethod === "wechat" ? "border-app-theme text-app-theme" : "border-app-border-l2 text-app-text-l3"
                )}
                style={{ backgroundColor: "var(--app-bg-l2)" }}
              >
                微信支付
              </button>
            </div>
          </div>

          {/* 支付按钮 */}
          <Button
            type="button"
            onClick={handlePay}
            className="w-full bg-app-theme text-app-secondary hover:bg-app-theme"
          >
            确认支付 ¥{selected?.price ?? 0}
          </Button>
          <p className="text-center text-xs text-app-text-l5">
            充值即代表同意《用户协议》与《充值协议》
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
