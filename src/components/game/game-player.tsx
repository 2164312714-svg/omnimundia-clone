"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Settings2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownText } from "@/components/shared/markdown-text";
import { GameSidebar } from "./game-sidebar";
import { CommentsPanel } from "@/components/comments/comments-panel";
import { mockTurnData, mockDashboardData, mockSaveGroups } from "@/lib/mock-data";
import { useModal } from "@/hooks/use-modal";
import type { TurnData } from "@/lib/types";

/** 后续回合 mock 数据（模拟 AI 推演推进） */
const nextTurns: TurnData[] = [
  {
    turn: 16,
    time: "深夜 02:31",
    sceneContent: `你绕着灯塔走了一圈。在灯塔的背面，靠近悬崖的位置，你发现了一扇半掩的铁门——和正门不同，这扇门上没有符号，但门把手上缠绕着新鲜的盐渍。

门内传来微弱的光，像是某种电子设备的待机灯。

你蹲下身，看到门边的地面上有脚印。两套。一套很大，像是成年男性的；另一套很小——**是孩子的脚印。**

在这个已经废弃了二十年的灯塔里，孩子的脚印意味着什么？`,
    options: [
      { id: "opt-1", index: 1, label: "推开铁门，循着光源走下去", isDisabled: false },
      { id: "opt-2", index: 2, label: "拍下脚印照片，先记在笔记本上", isDisabled: false },
      { id: "opt-3", index: 3, label: "沿着悬崖边的小径继续探索", isDisabled: false },
      { id: "opt-4", index: 4, label: "回到正门，用之前的铁门符号对照这里的差异", isDisabled: false },
    ],
    changes: [
      {
        turn: 16,
        added: [
          { id: "c1", type: "added", entityName: "灯塔背面", attributeName: "铁门", newValue: "半掩，有盐渍" },
          { id: "c2", type: "added", entityName: "未知", attributeName: "孩子脚印", newValue: "2套" },
        ],
        changed: [
          { id: "c3", type: "changed", entityName: "调查员", attributeName: "手电电量", oldValue: "67%", newValue: "61%" },
        ],
        removed: [],
      },
    ],
    isProcessing: false,
  },
  {
    turn: 17,
    time: "深夜 02:45",
    sceneContent: `你推开了铁门。门轴发出刺耳的摩擦声，但在风声的掩盖下并没有传出去太远。

门内是一条向下延伸的石阶。墙壁上的应急灯亮着——**有人在维护这里。**这不是一座废弃的灯塔。

石阶走了大约三十级，你来到了一间地下室。房间中央有一张桌子，上面摆着一台老式录音机和一摞手写的笔记。

录音机的磁带已经转到了尽头。桌上最上面的一本笔记翻开在某一页，上面写着今天的日期，和一行字：

> "他来了。第三次。让他读完这本笔记，然后做出选择。"`,
    options: [
      { id: "opt-1", index: 1, label: "翻开那本笔记，读下去", isDisabled: false },
      { id: "opt-2", index: 2, label: "按下录音机的播放键，听听磁带里录了什么", isDisabled: false },
      { id: "opt-3", index: 3, label: "先检查房间的其他角落，确认没有危险", isDisabled: false },
      { id: "opt-4", index: 4, label: "转身离开——这里不对劲", isDisabled: false },
    ],
    changes: [
      {
        turn: 17,
        added: [
          { id: "c1", type: "added", entityName: "灯塔地下室", attributeName: "状态", newValue: "有人维护" },
          { id: "c2", type: "added", entityName: "桌上笔记", attributeName: "内容", newValue: "今日日期" },
        ],
        changed: [
          { id: "c3", type: "changed", entityName: "调查员", attributeName: "位置", oldValue: "灯塔外", newValue: "地下室" },
        ],
        removed: [],
      },
    ],
    isProcessing: false,
  },
];

export function GamePlayer({ scriptId }: { scriptId: string }) {
  const { showModal } = useModal();
  const [turnIndex, setTurnIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const allTurns = [mockTurnData, ...nextTurns];
  const currentTurn = allTurns[Math.min(turnIndex, allTurns.length - 1)];
  const sceneRef = useRef<HTMLDivElement>(null);

  // 处理选项点击
  const handleOptionClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // 模拟 AI 推演延迟
    setTimeout(() => {
      if (turnIndex < allTurns.length - 1) {
        setTurnIndex(turnIndex + 1);
      }
      setIsProcessing(false);
    }, 2000);
  };

  // 处理自由输入
  const handleCustomSubmit = () => {
    if (!customInput.trim() || isProcessing) return;
    setIsProcessing(true);
    setCustomInput("");

    setTimeout(() => {
      if (turnIndex < allTurns.length - 1) {
        setTurnIndex(turnIndex + 1);
      }
      setIsProcessing(false);
    }, 2500);
  };

  // 滚动到场景顶部
  useEffect(() => {
    sceneRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [turnIndex]);

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* 主题感知根 */}
      <div className="game-layout flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 p-4">
          {/* 侧边栏 */}
          <GameSidebar
            turnData={currentTurn}
            dashboardData={mockDashboardData}
            saveGroups={mockSaveGroups}
            onOpenSaves={() => showModal("saveSaves")}
          />

          {/* 主面板 */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* 工具栏 */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-app-text-l3 hover:text-app-text-l1"
                  onClick={() => showModal("gameSettings")}
                >
                  <Settings2 className="h-4 w-4" />
                  <span className="ml-1 hidden text-sm sm:inline">剧本设置</span>
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-app-text-l3 hover:text-app-text-l1",
                    showComments && "text-app-theme"
                  )}
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-1 hidden text-sm sm:inline">评论区</span>
                </Button>
              </div>
            </div>

            {/* 故事面板 */}
            <div
              className="flex min-h-0 flex-1 flex-col overflow-hidden border rounded-md"
              style={{
                borderColor: "var(--app-border-l1)",
                backgroundColor: "var(--app-bg-l2)",
              }}
            >
              {/* 场景内容 */}
              <div
                ref={sceneRef}
                className="min-h-0 flex-1 overflow-y-auto p-6"
                style={{ backgroundColor: "var(--app-bg-l2)" }}
              >
                {isProcessing ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-app-text-l4">
                    <Loader2 className="h-8 w-8 animate-spin text-app-theme" />
                    <p className="text-sm">极速推演中...</p>
                    <p className="text-xs text-app-text-l5">生成已中断请重试</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center gap-2 text-xs text-app-text-l5">
                      <span className="rounded px-2 py-0.5" style={{ backgroundColor: "var(--app-bg-l3)" }}>
                        第 {currentTurn.turn} 回合
                      </span>
                      {currentTurn.time && <span>{currentTurn.time}</span>}
                    </div>
                    <MarkdownText content={currentTurn.sceneContent} />
                  </>
                )}
              </div>

              {/* 选项按钮 */}
              {!isProcessing && (
                <div
                  className="grid gap-2 p-3"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(calc(50% - 0.5rem), 1fr))",
                  }}
                >
                  {currentTurn.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={handleOptionClick}
                      disabled={option.isDisabled}
                      className={cn(
                        "relative flex items-center rounded-[14px] border px-4 py-2.5 text-left text-sm transition-all",
                        option.isDisabled
                          ? "cursor-not-allowed opacity-50"
                          : "hover:border-app-border-hover"
                      )}
                      style={{
                        backgroundColor: "var(--app-bg-game-option)",
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(0,0,0,0.03))",
                        borderColor: "var(--app-border-l3)",
                        color: "var(--app-story-option-color)",
                        minHeight: "36px",
                      }}
                    >
                      <span
                        className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "var(--app-color-theme-fade)",
                          color: "var(--app-color-theme)",
                        }}
                      >
                        {option.index}
                      </span>
                      <span className="leading-relaxed">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 自由输入区 */}
              {!isProcessing && (
                <div
                  className="flex items-end gap-2 border-t p-3"
                  style={{ borderColor: "var(--app-border-l1)" }}
                >
                  <Textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="或者，输入你想做的任何事..."
                    className="min-h-[40px] flex-1 resize-none border-0 bg-transparent text-sm"
                    style={{
                      backgroundColor: "var(--app-bg-l3)",
                      borderRadius: "6px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleCustomSubmit();
                      }
                    }}
                    rows={1}
                  />
                  <Button
                    size="icon"
                    className="h-9 w-9 shrink-0 bg-app-theme text-app-secondary"
                    onClick={handleCustomSubmit}
                    disabled={!customInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 评论区抽屉 */}
          {showComments && (
            <aside
              className="flex h-full w-[340px] shrink-0 flex-col overflow-hidden border-l"
              style={{
                borderColor: "var(--app-border-l1)",
                backgroundColor: "var(--app-bg-l2)",
              }}
            >
              <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "var(--app-border-l1)" }}>
                <span className="text-sm font-medium text-app-text-l2">剧本评论</span>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-app-text-l4 hover:text-app-text-l2"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <CommentsPanel scriptId={scriptId} embedded />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
