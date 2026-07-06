"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";

export function SurveyDialog() {
  const { closeModal } = useModal();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    closeModal();
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
            体验问卷
          </DialogTitle>
          <p className="text-center text-sm text-app-text-l5">
            您的反馈将帮助我们做得更好
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* 评分 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-app-text-l2">整体评分</p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-8 w-8",
                      (hover || rating) >= n ? "fill-current text-app-theme" : "text-app-text-l5"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 反馈 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-app-text-l2">您的建议（选填）</p>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="请输入您的建议或遇到的问题..."
              rows={4}
              style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
            />
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-app-theme text-app-secondary hover:bg-app-theme disabled:opacity-50"
          >
            提交
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
