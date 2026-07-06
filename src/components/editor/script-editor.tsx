"use client";

import { useState } from "react";
import {
  Boxes,
  FileText,
  Zap,
  Settings,
  Plus,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Save,
  Send,
  GitBranch,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockEntityGroups,
  mockEntryTree,
  mockEditorPassiveStates,
  mockEditorPeriodicEvents,
  mockEditorOneTimeEvents,
  mockEditorVersions,
} from "@/lib/mock-data";
import type { EntityGroup, Entry, PassiveState, PeriodicEvent, OneTimeEvent } from "@/lib/types";

type EditorTab = "world" | "entries" | "events" | "settings";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ScriptEditor({ scriptId }: { scriptId: string }) {
  const [activeTab, setActiveTab] = useState<EditorTab>("world");
  const [title, setTitle] = useState("雾港迷踪");
  const [description, setDescription] = useState("一座常年被雾气笼罩的港口小镇，接连发生离奇失踪案。");
  const [tags, setTags] = useState("悬疑, 调查, 克苏鲁");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* 顶部工具栏 */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: "var(--app-border-l1)", backgroundColor: "var(--app-bg-l2)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <GitBranch className="h-4 w-4 text-app-theme" />
            <span className="text-sm font-medium text-app-text-l1">{title}</span>
          </div>
          <span
            className="rounded px-2 py-0.5 text-xs"
            style={{ backgroundColor: "var(--app-color-yellow-fade)", color: "var(--app-color-yellow)" }}
          >
            审核中 v1.3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-app-border-l2 text-app-text-l3">
            <Save className="mr-1 h-3.5 w-3.5" />
            保存草稿
          </Button>
          <Button size="sm" className="bg-app-theme text-app-secondary">
            <Send className="mr-1 h-3.5 w-3.5" />
            提交审核
          </Button>
        </div>
      </div>

      {/* 版本选择条 */}
      <div
        className="flex items-center gap-2 overflow-x-auto border-b px-5 py-2"
        style={{ borderColor: "var(--app-border-l1)", backgroundColor: "var(--app-bg-l3)" }}
      >
        <Clock className="h-3.5 w-3.5 shrink-0 text-app-text-l4" />
        {mockEditorVersions.map((v) => (
          <span
            key={v.id}
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-3 py-1 text-xs transition-colors",
              v.isLatest ? "text-app-secondary" : "text-app-text-l4 hover:text-app-text-l2"
            )}
            style={v.isLatest ? { backgroundColor: "var(--app-color-theme)" } : { backgroundColor: "var(--app-bg-l2)" }}
          >
            {v.name}
            {v.isLatestPublished && " · 已发布"}
          </span>
        ))}
      </div>

      {/* 标签栏 */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EditorTab)} className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <TabsList
          className="grid w-full grid-cols-4 rounded-none border-b"
          style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l1)" }}
        >
          <TabsTrigger value="world" className="gap-1.5">
            <Boxes className="h-4 w-4" />
            世界树
          </TabsTrigger>
          <TabsTrigger value="entries" className="gap-1.5">
            <FileText className="h-4 w-4" />
            词条
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-1.5">
            <Zap className="h-4 w-4" />
            事件
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="h-4 w-4" />
            设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="world" className="mt-0 min-h-0 flex-1 overflow-y-auto p-5" style={{ backgroundColor: "var(--app-bg-l1)" }}>
          <WorldTreeEditor />
        </TabsContent>
        <TabsContent value="entries" className="mt-0 min-h-0 flex-1 overflow-y-auto p-5" style={{ backgroundColor: "var(--app-bg-l1)" }}>
          <EntryTreeEditor />
        </TabsContent>
        <TabsContent value="events" className="mt-0 min-h-0 flex-1 overflow-y-auto p-5" style={{ backgroundColor: "var(--app-bg-l1)" }}>
          <EventsEditor />
        </TabsContent>
        <TabsContent value="settings" className="mt-0 min-h-0 flex-1 overflow-y-auto p-5" style={{ backgroundColor: "var(--app-bg-l1)" }}>
          <ScriptSettingsEditor
            title={title}
            description={description}
            tags={tags}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onTagsChange={setTags}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ============== 世界树编辑器 ============== */

function WorldTreeEditor() {
  const [groups] = useState<EntityGroup[]>(mockEntityGroups);
  const [selectedEntity, setSelectedEntity] = useState<string | null>("e-1");

  const selectedEntityData = groups
    .flatMap((g) => g.entities)
    .find((e) => e.id === selectedEntity);

  return (
    <div className="mx-auto flex max-w-5xl gap-4">
      {/* 左侧实体树 */}
      <div className="w-64 shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-app-text-l2">实体列表</span>
          <button className="text-app-theme hover:opacity-70">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          {groups.map((g) => (
            <div key={g.id}>
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-app-text-l4">
                <ChevronDown className="h-3 w-3" />
                {g.name}
              </div>
              {g.entities.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelectedEntity(e.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm transition-colors",
                    selectedEntity === e.id
                      ? "text-app-secondary"
                      : "text-app-text-l2 hover:bg-app-bg-l3"
                  )}
                  style={selectedEntity === e.id ? { backgroundColor: "var(--app-color-theme)" } : undefined}
                >
                  {e.isPlayerControlled && (
                    <span className="text-[10px]" style={{ color: selectedEntity === e.id ? "var(--app-secondary)" : "var(--app-color-theme)" }}>PC</span>
                  )}
                  {e.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 右侧属性编辑 */}
      <div className="flex-1">
        {selectedEntityData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={selectedEntityData.name}
                className="font-medium"
                style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
              />
              <label className="flex items-center gap-1.5 text-xs text-app-text-l3">
                <input type="checkbox" checked={selectedEntityData.isPlayerControlled} readOnly className="accent-app-theme" />
                玩家控制
              </label>
            </div>

            {selectedEntityData.attributeGroups.map((ag) => (
              <div
                key={ag.id}
                className="rounded-[14px] border p-4"
                style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-app-text-l2">{ag.name}</span>
                  <button className="text-app-text-l4 hover:text-app-theme">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {ag.attributes.map((a) => (
                    <div key={a.id} className="flex items-center gap-2">
                      <Input
                        defaultValue={a.name}
                        className="flex-1 text-sm"
                        style={{ backgroundColor: "var(--app-bg-l3)", borderColor: "var(--app-border-l1)" }}
                      />
                      <Input
                        defaultValue={a.value ?? ""}
                        className="w-32 text-sm"
                        style={{ backgroundColor: "var(--app-bg-l3)", borderColor: "var(--app-border-l1)" }}
                      />
                      <button className="text-app-text-l4 hover:text-app-theme">
                        {a.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button className="text-app-text-l4 hover:text-app-red">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-sm text-app-text-l4">
            从左侧选择一个实体进行编辑
          </div>
        )}
      </div>
    </div>
  );
}

/* ============== 词条树编辑器 ============== */

function EntryTreeEditor() {
  const [entries] = useState<Entry[]>(mockEntryTree);
  const [selectedEntry, setSelectedEntry] = useState<string | null>("entry-1");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["entry-1", "entry-2"]));

  const findEntry = (list: Entry[], id: string): Entry | null => {
    for (const e of list) {
      if (e.id === id) return e;
      const found = findEntry(e.children, id);
      if (found) return found;
    }
    return null;
  };

  const selected = findEntry(entries, selectedEntry ?? "");

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderEntry = (entry: Entry, depth: number): React.ReactNode => (
    <div key={entry.id}>
      <div
        className="flex w-full items-center gap-1 rounded px-1 py-0.5 text-sm transition-colors"
        style={{
          paddingLeft: `${depth * 16}px`,
        }}
      >
        {/* 展开/折叠按钮（键盘可达） */}
        {entry.children.length > 0 ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleExpand(entry.id); }}
            aria-label={expanded.has(entry.id) ? "折叠" : "展开"}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-app-text-l4 hover:text-app-theme"
          >
            {expanded.has(entry.id) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        ) : (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <FileText className="h-3 w-3 text-app-text-l5" />
          </span>
        )}
        {/* 选择按钮 */}
        <button
          type="button"
          onClick={() => setSelectedEntry(entry.id)}
          className={cn(
            "flex-1 truncate rounded px-2 py-1 text-left text-sm transition-colors",
            selectedEntry === entry.id
              ? "text-app-secondary"
              : "text-app-text-l2 hover:bg-app-bg-l3"
          )}
          style={selectedEntry === entry.id ? { backgroundColor: "var(--app-color-theme)" } : undefined}
        >
          {entry.title}
        </button>
      </div>
      {entry.children.length > 0 && expanded.has(entry.id) && (
        <div>{entry.children.map((c) => renderEntry(c, depth + 1))}</div>
      )}
    </div>
  );

  return (
    <div className="mx-auto flex max-w-5xl gap-4">
      {/* 左侧词条树 */}
      <div className="w-64 shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-app-text-l2">词条列表</span>
          <button className="text-app-theme hover:opacity-70">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-0.5">
          {entries.map((e) => renderEntry(e, 0))}
        </div>
      </div>

      {/* 右侧编辑器 */}
      <div className="flex-1">
        {selected ? (
          <div className="space-y-3">
            <Input
              defaultValue={selected.title}
              className="text-base font-medium"
              style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
            />
            <Textarea
              defaultValue={selected.content ?? ""}
              placeholder="输入词条内容..."
              rows={12}
              className="resize-none text-sm leading-relaxed"
              style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
            />
            <div className="flex items-center justify-between text-xs text-app-text-l4">
              <span>支持 Markdown 格式</span>
              <button className="flex items-center gap-1 text-app-theme hover:opacity-70">
                <Save className="h-3 w-3" />
                保存
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-sm text-app-text-l4">
            从左侧选择一个词条进行编辑
          </div>
        )}
      </div>
    </div>
  );
}

/* ============== 事件编辑器 ============== */

function EventsEditor() {
  const [passiveStates] = useState<PassiveState[]>(mockEditorPassiveStates);
  const [periodicEvents] = useState<PeriodicEvent[]>(mockEditorPeriodicEvents);
  const [oneTimeEvents] = useState<OneTimeEvent[]>(mockEditorOneTimeEvents);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 持续状态 */}
      <EventSection title="持续状态 (Passive State)" description="在游戏中持续生效的状态效果">
        {passiveStates.map((ps) => (
          <div
            key={ps.id}
            className="flex items-center gap-3 rounded-[12px] border p-3"
            style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l3))" }}>
              <Zap className="h-4 w-4 text-app-theme" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-app-text-l1">{ps.name}</span>
                {ps.initiallyVisible && (
                  <span className="text-[10px] text-app-green">初始可见</span>
                )}
              </div>
              <p className="text-xs text-app-text-l4">{ps.description}</p>
            </div>
            <button className="text-app-text-l4 hover:text-app-theme"><Edit3 className="h-4 w-4" /></button>
          </div>
        ))}
      </EventSection>

      {/* 循环事件 */}
      <EventSection title="循环事件 (Periodic Event)" description="按频率周期性触发的事件">
        {periodicEvents.map((pe) => (
          <div
            key={pe.id}
            className="flex items-center gap-3 rounded-[12px] border p-3"
            style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l3))" }}>
              <Clock className="h-4 w-4 text-app-theme" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-app-text-l1">{pe.name}</span>
                <span className="text-[10px] text-app-text-l5">
                  每 {pe.frequency} {pe.frequencyUnit === "turn" ? "回合" : pe.frequencyUnit === "day" ? "天" : "小时"}
                </span>
              </div>
              <p className="text-xs text-app-text-l4">{pe.description}</p>
            </div>
            <button className="text-app-text-l4 hover:text-app-theme"><Edit3 className="h-4 w-4" /></button>
          </div>
        ))}
      </EventSection>

      {/* 特别事件 */}
      <EventSection title="特别事件 (One-Time Event)" description="只触发一次或满足条件时触发的剧情事件">
        {oneTimeEvents.map((ot) => (
          <div
            key={ot.id}
            className="flex items-center gap-3 rounded-[12px] border p-3"
            style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "var(--app-color-theme-fade, var(--app-bg-l3))" }}>
              <Zap className="h-4 w-4 text-app-theme" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-app-text-l1">{ot.name}</span>
                <span className="text-[10px] text-app-text-l5">首次：{ot.firstTrigger}</span>
                {ot.triggerOnce && <span className="text-[10px] text-app-green">仅一次</span>}
              </div>
              <p className="text-xs text-app-text-l4">{ot.description}</p>
            </div>
            <button className="text-app-text-l4 hover:text-app-theme"><Edit3 className="h-4 w-4" /></button>
          </div>
        ))}
      </EventSection>
    </div>
  );
}

function EventSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-app-text-l1">{title}</h3>
          <p className="text-xs text-app-text-l4">{description}</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-app-theme hover:opacity-70">
          <Plus className="h-4 w-4" />
          新增
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* ============== 设置编辑器 ============== */

function ScriptSettingsEditor({
  title,
  description,
  tags,
  onTitleChange,
  onDescriptionChange,
  onTagsChange,
}: {
  title: string;
  description: string;
  tags: string;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onTagsChange: (v: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-app-text-l2">剧本名称</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app-text-l2">剧本简介</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={4}
          style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app-text-l2">标签（逗号分隔）</label>
        <Input
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)", color: "var(--app-text-l1)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app-text-l2">分类</label>
        <div className="flex flex-wrap gap-2">
          {["脑洞", "悬疑", "奇幻", "科幻", "日常", "恐怖"].map((cat) => (
            <button
              key={cat}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                cat === "脑洞"
                  ? "border-app-theme text-app-secondary"
                  : "border-app-border-l2 text-app-text-l3 hover:border-app-theme"
              )}
              style={cat === "脑洞" ? { backgroundColor: "var(--app-color-theme)" } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app-text-l2">封面图</label>
        <div
          className="flex h-32 cursor-pointer items-center justify-center rounded-[14px] border-2 border-dashed"
          style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}
        >
          <div className="text-center">
            <Plus className="mx-auto h-6 w-6 text-app-text-l4" />
            <p className="mt-1 text-xs text-app-text-l4">点击上传封面图</p>
          </div>
        </div>
      </div>
    </div>
  );
}
