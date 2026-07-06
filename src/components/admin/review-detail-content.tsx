"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  X,
  FileText,
  User,
  Clock,
  Tag,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  mockEntityGroups,
  mockEntryTree,
  mockEditorPassiveStates,
  mockEditorPeriodicEvents,
  mockEditorOneTimeEvents,
} from "@/lib/mock-data";
import type { ScriptReview } from "@/lib/types";
import Link from "next/link";

/** 审核详情 mock（基于 scriptVersionId 查找） */
const reviewDetail: ScriptReview = {
  id: "review-001",
  scriptVersionId: "sv-001",
  scriptTitle: "雾港迷踪",
  author: "白 queen",
  authorEmail: "2164312714@qq.com",
  versionName: "v1.3",
  description: "新增第三幕'灯塔之下'内容，修复了骰子检定逻辑，补充了 3 个 NPC 的设定。",
  submittedAt: "2026-06-30T10:00:00Z",
  status: "pending",
};

export function ReviewDetailContent({ scriptVersionId }: { scriptVersionId: string }) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleSubmit = () => {
    setAction(null);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-5">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-app-text-l4">
        <Link href="/admin/script-reviews" className="flex items-center gap-1 hover:text-app-theme">
          <ArrowLeft className="h-4 w-4" />
          返回审核列表
        </Link>
        <span className="text-app-text-l5">/</span>
        <span className="text-app-text-l3">{scriptVersionId}</span>
      </div>

      {/* 审核头部 */}
      <div
        className="rounded-[18px] border p-6"
        style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-app-text-l1">{reviewDetail.scriptTitle}</h1>
              <span
                className="rounded-full px-3 py-0.5 text-xs"
                style={{ backgroundColor: "var(--app-color-yellow-fade)", color: "var(--app-color-yellow)" }}
              >
                {reviewDetail.versionName} · 待审核
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-app-text-l4">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {reviewDetail.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {reviewDetail.authorEmail}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {new Date(reviewDetail.submittedAt).toLocaleString("zh-CN")}
              </span>
            </div>
          </div>
        </div>
        <div
          className="mt-4 rounded-[12px] p-3"
          style={{ backgroundColor: "var(--app-bg-l3)" }}
        >
          <p className="text-sm text-app-text-l2">
            <span className="font-medium text-app-text-l1">版本说明：</span>
            {reviewDetail.description}
          </p>
        </div>
      </div>

      {/* 剧本内容预览 */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-app-text-l1">
          <Eye className="h-5 w-5 text-app-theme" />
          剧本内容预览
        </h2>

        {/* 世界树预览 */}
        <PreviewSection title="世界树 · 实体设定">
          <div className="space-y-3">
            {mockEntityGroups.map((g) => (
              <div key={g.id}>
                <p className="mb-1 text-sm font-medium text-app-text-l3">{g.name}</p>
                <div className="flex flex-wrap gap-2">
                  {g.entities.map((e) => (
                    <span
                      key={e.id}
                      className="rounded-full border px-3 py-1 text-xs text-app-text-l2"
                      style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l3)" }}
                    >
                      {e.name}
                      <span className="ml-1 text-app-text-l5">
                        ({e.attributeGroups.reduce((sum, ag) => sum + ag.attributes.length, 0)} 属性)
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PreviewSection>

        {/* 词条预览 */}
        <PreviewSection title="词条 · 世界观">
          <div className="space-y-2">
            {mockEntryTree.map((entry) => (
              <div key={entry.id} className="rounded-[10px] p-2" style={{ backgroundColor: "var(--app-bg-l3)" }}>
                <p className="text-sm font-medium text-app-text-l2">{entry.title}</p>
                <p className="mt-0.5 text-xs text-app-text-l4 line-clamp-2">{entry.content}</p>
                {entry.children.length > 0 && (
                  <div className="mt-1 pl-3 text-xs text-app-text-l5">
                    子词条：{entry.children.map((c) => c.title).join("、")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </PreviewSection>

        {/* 事件预览 */}
        <PreviewSection title="事件 · 状态与触发">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="mb-1 text-xs font-medium text-app-text-l3">持续状态 ({mockEditorPassiveStates.length})</p>
              {mockEditorPassiveStates.map((ps) => (
                <p key={ps.id} className="text-xs text-app-text-l2">{ps.name}</p>
              ))}
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-app-text-l3">循环事件 ({mockEditorPeriodicEvents.length})</p>
              {mockEditorPeriodicEvents.map((pe) => (
                <p key={pe.id} className="text-xs text-app-text-l2">{pe.name}</p>
              ))}
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-app-text-l3">特别事件 ({mockEditorOneTimeEvents.length})</p>
              {mockEditorOneTimeEvents.map((ot) => (
                <p key={ot.id} className="text-xs text-app-text-l2">{ot.name}</p>
              ))}
            </div>
          </div>
        </PreviewSection>
      </div>

      {/* 审核操作 */}
      <div
        className="rounded-[18px] border p-6"
        style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
      >
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-app-text-l1">
          <FileText className="h-5 w-5 text-app-theme" />
          审核操作
        </h2>

        {action === null ? (
          <div className="flex gap-3">
            <Button
              onClick={() => setAction("approve")}
              className="bg-app-green text-app-secondary hover:bg-app-green"
            >
              <Check className="mr-1.5 h-4 w-4" />
              通过审核
            </Button>
            <Button
              onClick={() => setAction("reject")}
              variant="outline"
              className="border-app-red text-app-red hover:bg-app-red hover:text-app-secondary"
            >
              <X className="mr-1.5 h-4 w-4" />
              驳回
            </Button>
          </div>
        ) : action === "approve" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-[12px] p-3" style={{ backgroundColor: "var(--app-color-green-fade)" }}>
              <Check className="h-5 w-5 text-app-green" />
              <p className="text-sm text-app-text-l2">
                确认通过 <span className="font-medium">{reviewDetail.scriptTitle}</span> 的{" "}
                <span className="font-medium">{reviewDetail.versionName}</span> 版本审核？
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSubmit} className="bg-app-green text-app-secondary">
                确认通过
              </Button>
              <Button variant="outline" onClick={() => setAction(null)}>
                取消
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-[12px] p-3" style={{ backgroundColor: "var(--app-color-red-fade)" }}>
              <AlertCircle className="h-5 w-5 text-app-red" />
              <p className="text-sm text-app-text-l2">请填写驳回理由，作者将在后台收到通知。</p>
            </div>
            <div className="space-y-2">
              <Label className="text-app-text-l2">驳回理由</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="请详细说明需要修改的内容..."
                rows={4}
                style={{ backgroundColor: "var(--app-bg-l3)", borderColor: "var(--app-border-l2)" }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!rejectReason.trim()}
                className="bg-app-red text-app-secondary disabled:opacity-50"
              >
                确认驳回
              </Button>
              <Button variant="outline" onClick={() => setAction(null)}>
                取消
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-[14px] border p-4"
      style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
    >
      <h3 className="mb-3 text-sm font-semibold text-app-text-l1">{title}</h3>
      {children}
    </div>
  );
}
