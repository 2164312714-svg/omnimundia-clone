"use client";

import { Plus, Edit3, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TurnChangeSet, ChangeType } from "@/lib/types";

const changeConfig: Record<ChangeType, {
  label: string;
  icon: typeof Plus;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}> = {
  added: {
    label: "本回合新增",
    icon: Plus,
    borderColor: "var(--app-color-green)",
    backgroundColor: "var(--app-color-green-fade)",
    textColor: "var(--app-color-green)",
  },
  changed: {
    label: "本回合有更新",
    icon: Edit3,
    borderColor: "var(--app-color-yellow)",
    backgroundColor: "var(--app-color-yellow-fade)",
    textColor: "var(--app-color-yellow)",
  },
  removed: {
    label: "本回合被移除",
    icon: Minus,
    borderColor: "var(--app-color-red)",
    backgroundColor: "var(--app-color-red-fade)",
    textColor: "var(--app-color-red)",
  },
};

export function WorldStateCollapse({ changeSet }: { changeSet: TurnChangeSet }) {
  const groups: Array<{ type: ChangeType; items: TurnChangeSet["added"] }> = [
    { type: "added", items: changeSet.added },
    { type: "changed", items: changeSet.changed },
    { type: "removed", items: changeSet.removed },
  ];

  const nonEmpty = groups.filter((g) => g.items.length > 0);

  if (nonEmpty.length === 0) return null;

  return (
    <Accordion multiple={false} defaultValue={["changes"]} className="w-full">
      <AccordionItem
        value="changes"
        className="overflow-hidden border"
        style={{
          borderColor: "var(--app-border-l1, var(--app-border-l1))",
          borderRadius: "18px",
          backgroundColor: "var(--app-bg-l2)",
        }}
      >
        <AccordionTrigger
          className="px-4 text-app-text-l2"
          style={{ minHeight: "2.75rem", fontSize: "1rem" }}
        >
          第 {changeSet.turn} 回合 · 变更
        </AccordionTrigger>
        <AccordionContent className="space-y-2 px-4 pb-4">
          {nonEmpty.map((group) => {
            const config = changeConfig[group.type];
            const Icon = config.icon;
            return (
              <div key={group.type} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: config.textColor }}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="font-medium">{config.label}</span>
                </div>
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[14px] border px-3.5 py-2.5 text-sm"
                    style={{
                      borderColor: config.borderColor,
                      backgroundColor: config.backgroundColor,
                    }}
                  >
                    <span className="font-medium text-app-text-l1">{item.entityName}</span>
                    {" · "}
                    <span className="text-app-text-l3">{item.attributeName}</span>
                    {item.newValue && (
                      <span className="text-app-text-l2"> → {item.newValue}</span>
                    )}
                    {item.oldValue && !item.newValue && (
                      <span className="text-app-text-l4">（{item.oldValue}）</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
