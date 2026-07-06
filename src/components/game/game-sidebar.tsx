"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Save, Users, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorldStateCollapse } from "./world-state-collapse";
import type { TurnData, DashboardData, SaveGroup } from "@/lib/types";

interface GameSidebarProps {
  turnData: TurnData;
  dashboardData: DashboardData;
  saveGroups: SaveGroup[];
  onOpenSaves?: () => void;
}

export function GameSidebar({ turnData, dashboardData, saveGroups, onOpenSaves }: GameSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside
        className="flex flex-col items-center py-3"
        style={{
          width: "60px",
          backgroundColor: "var(--app-bg-sidebar)",
          borderRight: "1px solid var(--app-border-l1)",
          flexShrink: 0,
          transition: "width 0.3s ease",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-app-text-l3"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="mt-3 flex flex-col gap-3">
          <Users className="h-4 w-4 text-app-text-l4" />
          <Save className="h-4 w-4 text-app-text-l4" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="flex flex-col"
      style={{
        width: "260px",
        backgroundColor: "var(--app-bg-sidebar)",
        borderRight: "1px solid var(--app-border-l1)",
        padding: "1rem",
        height: "100%",
        flexShrink: 0,
        transition: "width 0.3s ease",
        zIndex: 200,
      }}
    >
      {/* 折叠按钮 */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-app-text-l2">世界状态</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-app-text-l4"
          onClick={() => setCollapsed(true)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1" style={{ minHeight: 0 }}>
        <div className="space-y-4 pr-2">
          {/* 游戏时间 */}
          <div className="border-b pb-3" style={{ borderColor: "var(--app-border-l1)" }}>
            <p className="flex items-center justify-between text-sm">
              <span className="text-app-text-l4">回合</span>
              <span className="font-semibold text-app-text-l1">第 {turnData.turn} 回合</span>
            </p>
            {turnData.time && (
              <p className="mt-1 flex items-center justify-between text-sm">
                <span className="text-app-text-l4">时间</span>
                <span className="text-app-text-l2">{turnData.time}</span>
              </p>
            )}
          </div>

          {/* 变更集 */}
          {turnData.changes.map((cs) => (
            <WorldStateCollapse key={cs.turn} changeSet={cs} />
          ))}

          {/* 实体与属性 */}
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-app-text-l2">
              <Users className="h-3.5 w-3.5" />
              实体
            </h3>
            <div className="space-y-2">
              {dashboardData.entities.map((entity) => (
                <div
                  key={entity.name}
                  className="rounded-lg border p-2"
                  style={{
                    backgroundColor: "var(--app-bg-card)",
                    borderColor: "var(--app-border-l1)",
                  }}
                >
                  <p className="text-sm font-medium text-app-text-l1">{entity.name}</p>
                  <div className="mt-1 space-y-0.5">
                    {entity.attributes.map((attr) => (
                      <div key={attr.name} className="flex justify-between text-xs">
                        <span className="text-app-text-l4">{attr.name}</span>
                        <span className="text-app-text-l2">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 持续状态 */}
          {dashboardData.passiveStates.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-app-text-l2">
                <CircleDot className="h-3.5 w-3.5" />
                持续状态
              </h3>
              <div className="space-y-1.5">
                {dashboardData.passiveStates.map((state) => (
                  <div
                    key={state.id}
                    className="rounded-lg border px-2 py-1.5"
                    style={{
                      backgroundColor: "var(--app-bg-card)",
                      borderColor: "var(--app-border-l1)",
                    }}
                  >
                    <p className="text-sm font-medium text-app-text-l2">{state.name}</p>
                    {state.description && (
                      <p className="mt-0.5 text-xs text-app-text-l4">{state.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 存档 */}
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-app-text-l2">
              <Save className="h-3.5 w-3.5" />
              存档
            </h3>
            <div className="space-y-2">
              {saveGroups.map((group) => (
                <div key={group.id}>
                  <p className="mb-1 text-xs text-app-text-l5">{group.name}</p>
                  {group.saves.map((save) => (
                    <button
                      key={save.id}
                      onClick={onOpenSaves}
                      className={cn(
                        "mb-1 w-full rounded-md border px-2 py-1.5 text-left text-xs transition-colors",
                        save.isActive
                          ? "border-app-theme bg-app-theme-fade"
                          : "hover:bg-app-bg-l5"
                      )}
                      style={{
                        backgroundColor: save.isActive ? undefined : "var(--app-bg-card)",
                        borderColor: save.isActive ? "var(--app-color-theme)" : "var(--app-border-l1)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-app-text-l1">{save.name}</span>
                        {save.isAutoSave && (
                          <span className="text-app-text-l5">自动</span>
                        )}
                      </div>
                      <span className="text-app-text-l5">T{save.turn} · {save.versionName}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
