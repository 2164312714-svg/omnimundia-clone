"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChatMessages, mockMemories } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";

/**
 * OMI 聊天浮窗 — 对应原站右下角悬浮的 Omi 助手。
 * 浮动触发器可拖拽；面板内含对话流、记忆抽屉、模拟流式回复。
 */
export function OmiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showMemories, setShowMemories] = useState(false);

  // 拖拽浮动按钮
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始定位右下
  useEffect(() => {
    setPos({
      x: window.innerWidth - 80,
      y: window.innerHeight - 140,
    });
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: Math.max(8, Math.min(window.innerWidth - 56, dragRef.current.baseX + dx)),
      y: Math.max(8, Math.min(window.innerHeight - 56, dragRef.current.baseY + dy)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    // 若几乎没移动，视为点击 → 打开面板
    if (dragRef.current) {
      const dx = Math.abs(e.clientX - dragRef.current.startX);
      const dy = Math.abs(e.clientY - dragRef.current.startY);
      if (dx < 5 && dy < 5) {
        setOpen(true);
      }
    }
    dragRef.current = null;
  };

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    // 模拟流式回复
    const reply = "好的，我来帮你分析一下。根据当前的世界线状态和你的位置，我建议你先回到上一个安全存档点，然后从那里重新审视线索。注意你背包里的那页笔记——它可能比你以为的更重要。";
    const tempId = `msg-${Date.now()}-ai`;
    let charIndex = 0;

    setMessages((prev) => [
      ...prev,
      { id: tempId, role: "assistant", content: "", time: new Date().toISOString(), isStreaming: true },
    ]);

    const interval = setInterval(() => {
      charIndex += 2;
      const partial = reply.slice(0, charIndex);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, content: partial } : m))
      );
      if (charIndex >= reply.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId ? { ...m, content: reply, isStreaming: false } : m
          )
        );
        setStreaming(false);
      }
    }, 40);
  }, [input, streaming]);

  const handleClear = () => {
    setMessages([mockChatMessages[0]]);
  };

  return (
    <>
      {/* 浮动触发器 */}
      <button
        ref={buttonRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="fixed z-[900] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          backgroundColor: "var(--app-color-theme)",
          boxShadow: "0 6px 20px rgba(217,119,6,0.4)",
          touchAction: "none",
        }}
        aria-label="打开 Omi 助手"
      >
        <Sparkles className="h-6 w-6 text-app-secondary" />
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: "var(--app-color-theme)" }}
        />
      </button>

      {/* 聊天面板 */}
      {open && (
        <div
          className="fixed z-[901] flex flex-col overflow-hidden border"
          style={{
            left: `${Math.min(pos.x - 360, window.innerWidth - 400)}px`,
            top: `${Math.max(20, pos.y - 480)}px`,
            width: "380px",
            height: "540px",
            backgroundColor: "var(--app-bg-l5)",
            borderColor: "var(--app-border-l2)",
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          }}
        >
          {/* 头部 */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              backgroundColor: "var(--app-color-theme)",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-app-secondary/20">
                <Sparkles className="h-4 w-4 text-app-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-app-secondary">Omi</p>
                <p className="text-[10px] text-app-secondary/70">在线 · 随时待命</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="rounded p-1.5 text-app-secondary/80 transition-colors hover:bg-app-secondary/10"
                title="清空对话"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowMemories(!showMemories)}
                className={cn(
                  "rounded p-1.5 transition-colors hover:bg-app-secondary/10",
                  showMemories ? "bg-app-secondary/10 text-app-secondary" : "text-app-secondary/80"
                )}
                title="长期记忆"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1.5 text-app-secondary/80 transition-colors hover:bg-app-secondary/10"
                title="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 记忆抽屉 */}
          {showMemories && (
            <div
              className="max-h-32 overflow-y-auto border-b px-4 py-2"
              style={{ backgroundColor: "var(--app-bg-l3)", borderColor: "var(--app-border-l1)" }}
            >
              <p className="mb-1.5 text-xs font-medium text-app-text-l3">Omi 的长期记忆</p>
              <div className="space-y-1.5">
                {mockMemories.map((m) => (
                  <div key={m.id} className="rounded-md px-2 py-1" style={{ backgroundColor: "var(--app-bg-l2)" }}>
                    <p className="text-xs font-medium text-app-text-l2">{m.title}</p>
                    <p className="text-[10px] text-app-text-l4">{m.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 消息流 */}
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            style={{ backgroundColor: "var(--app-bg-l4)" }}
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {streaming && (
              <div className="flex items-center gap-1 pl-2 text-app-text-l5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-app-theme [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-app-theme [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-app-theme [animation-delay:300ms]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区 */}
          <div
            className="border-t px-3 py-2.5"
            style={{ backgroundColor: "var(--app-bg-l5)", borderColor: "var(--app-border-l1)" }}
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="和 Omi 说点什么..."
                rows={1}
                className="max-h-24 flex-1 resize-none rounded-[12px] border px-3 py-2 text-sm outline-none"
                style={{
                  backgroundColor: "var(--app-bg-l2)",
                  borderColor: "var(--app-border-l2)",
                  color: "var(--app-text-l1)",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:opacity-40"
                style={{ backgroundColor: "var(--app-color-theme)" }}
              >
                <Send className="h-4 w-4 text-app-secondary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** 消息气泡 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className="max-w-[80%] rounded-[14px] px-3.5 py-2.5 text-sm leading-relaxed"
        style={
          isUser
            ? {
                backgroundColor: "var(--app-color-theme)",
                color: "var(--app-secondary)",
                borderTopRightRadius: "4px",
              }
            : {
                backgroundColor: "var(--app-bg-l2)",
                color: "var(--app-text-l1)",
                borderTopLeftRadius: "4px",
                border: "1px solid var(--app-border-l1)",
              }
        }
      >
        <p className="whitespace-pre-wrap">{message.content}{message.isStreaming && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle" />}</p>
      </div>
    </div>
  );
}
