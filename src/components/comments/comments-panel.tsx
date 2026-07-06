"use client";

import { useState, useCallback } from "react";
import { Heart, MessageSquare, Send, ImagePlus, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockComments } from "@/lib/mock-data";
import type { Comment } from "@/lib/types";
import { useUser } from "@/hooks/use-user";

interface CommentsPanelProps {
  scriptId: string;
  /** 嵌入式（无外层卡片边框）或独立卡片 */
  embedded?: boolean;
}

/**
 * 评论区 — 对应原站 script-detail 与 game 页面下方的评论模块。
 * 支持发布评论、点赞、回复（一层嵌套）。
 */
export function CommentsPanel({ scriptId, embedded = false }: CommentsPanelProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.scriptId === scriptId)
  );
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState("");

  const handlePost = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      scriptId,
      author: user.nickname || "匿名用户",
      authorAvatar: undefined,
      content: text,
      images: [],
      time: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
    setDraft("");
  }, [draft, scriptId, user.nickname]);

  const handleReply = useCallback((parentId: string) => {
    const text = replyDraft.trim();
    if (!text) return;
    const parent = comments.find((c) => c.id === parentId);
    if (!parent) return;
    const newReply: Comment = {
      id: `comment-${Date.now()}-r`,
      scriptId,
      author: user.nickname || "匿名用户",
      authorAvatar: undefined,
      content: text,
      images: [],
      time: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
      replies: [],
      replyTarget: parent.author,
    };
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c
      )
    );
    setReplyDraft("");
    setReplyTo(null);
  }, [replyDraft, comments, scriptId, user.nickname]);

  const toggleLike = useCallback((id: string, isReply = false, parentId?: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === id) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1,
          };
        }
        if (isReply && c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === id
                ? {
                    ...r,
                    isLiked: !r.isLiked,
                    likeCount: r.isLiked ? r.likeCount - 1 : r.likeCount + 1,
                  }
                : r
            ),
          };
        }
        return c;
      })
    );
  }, []);

  return (
    <div
      className={cn(!embedded && "rounded-[18px] border p-5")}
      style={
        !embedded
          ? { backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }
          : undefined
      }
    >
      {/* 标题 */}
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-app-theme" />
        <h3 className="text-lg font-semibold text-app-text-l1">
          评论 <span className="text-sm font-normal text-app-text-l4">({comments.length})</span>
        </h3>
      </div>

      {/* 输入框 */}
      <div className="mb-5 space-y-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="说点什么... 支持文字和图片"
          rows={3}
          className="w-full resize-none rounded-[12px] border px-3 py-2.5 text-sm outline-none"
          style={{
            backgroundColor: "var(--app-bg-l3)",
            borderColor: "var(--app-border-l2)",
            color: "var(--app-text-l1)",
          }}
        />
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm text-app-text-l4 hover:text-app-text-l3">
            <ImagePlus className="h-4 w-4" />
            添加图片
          </button>
          <button
            onClick={handlePost}
            disabled={!draft.trim()}
            className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm text-app-secondary transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "var(--app-color-theme)" }}
          >
            <Send className="h-3.5 w-3.5" />
            发布
          </button>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            replyTo={replyTo}
            replyDraft={replyDraft}
            setReplyDraft={setReplyDraft}
            onToggleReply={() => setReplyTo(replyTo === c.id ? null : c.id)}
            onReply={() => handleReply(c.id)}
            onLike={() => toggleLike(c.id)}
            onLikeReply={(rid) => toggleLike(rid, true, c.id)}
          />
        ))}
        {comments.length === 0 && (
          <p className="py-8 text-center text-sm text-app-text-l4">
            还没有评论，来抢沙发吧
          </p>
        )}
      </div>
    </div>
  );
}

/** 单条评论 */
function CommentItem({
  comment,
  replyTo,
  replyDraft,
  setReplyDraft,
  onToggleReply,
  onReply,
  onLike,
  onLikeReply,
}: {
  comment: Comment;
  replyTo: string | null;
  replyDraft: string;
  setReplyDraft: (v: string) => void;
  onToggleReply: () => void;
  onReply: () => void;
  onLike: () => void;
  onLikeReply: (rid: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        {/* 头像 */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-app-secondary"
          style={{ backgroundColor: "var(--app-color-theme)" }}
        >
          {comment.author.slice(0, 1)}
        </div>
        {/* 内容 */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-app-text-l1">{comment.author}</span>
            <span className="text-xs text-app-text-l5">{formatTime(comment.time)}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-app-text-l2">{comment.content}</p>
          {/* 操作 */}
          <div className="mt-1.5 flex items-center gap-4 text-xs text-app-text-l4">
            <button
              onClick={onLike}
              className={cn("flex items-center gap-1 transition-colors hover:text-app-theme", comment.isLiked && "text-app-theme")}
            >
              <Heart className={cn("h-3.5 w-3.5", comment.isLiked && "fill-current")} />
              {comment.likeCount}
            </button>
            <button onClick={onToggleReply} className="flex items-center gap-1 transition-colors hover:text-app-theme">
              <CornerDownRight className="h-3.5 w-3.5" />
              回复
            </button>
          </div>

          {/* 回复列表 */}
          {comment.replies.length > 0 && (
            <div className="mt-2 space-y-2 border-l-2 pl-3" style={{ borderColor: "var(--app-border-l1)" }}>
              {comment.replies.map((r) => (
                <div key={r.id} className="flex gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium text-app-secondary"
                    style={{ backgroundColor: "var(--app-color-theme)", opacity: 0.7 }}
                  >
                    {r.author.slice(0, 1)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-app-text-l1">{r.author}</span>
                      {r.replyTarget && (
                        <span className="text-xs text-app-text-l5">回复 @{r.replyTarget}</span>
                      )}
                      <span className="text-xs text-app-text-l5">{formatTime(r.time)}</span>
                    </div>
                    <p className="mt-0.5 text-sm leading-relaxed text-app-text-l2">{r.content}</p>
                    <button
                      onClick={() => onLikeReply(r.id)}
                      className={cn(
                        "mt-1 flex items-center gap-1 text-xs transition-colors hover:text-app-theme",
                        r.isLiked && "text-app-theme"
                      )}
                    >
                      <Heart className={cn("h-3 w-3", r.isLiked && "fill-current")} />
                      {r.likeCount}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 回复输入框 */}
          {replyTo === comment.id && (
            <div className="mt-2 flex items-end gap-2">
              <textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder={`回复 @${comment.author}...`}
                rows={1}
                className="flex-1 resize-none rounded-[10px] border px-3 py-1.5 text-sm outline-none"
                style={{
                  backgroundColor: "var(--app-bg-l3)",
                  borderColor: "var(--app-border-l2)",
                  color: "var(--app-text-l1)",
                }}
              />
              <button
                onClick={onReply}
                disabled={!replyDraft.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-40"
                style={{ backgroundColor: "var(--app-color-theme)" }}
              >
                <Send className="h-3.5 w-3.5 text-app-secondary" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** 时间格式化 */
function formatTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 60) return "刚刚";
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} 天前`;
  return d.toLocaleDateString("zh-CN");
}
