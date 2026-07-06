import type { EntityGroup, Entry, PassiveState, PeriodicEvent, OneTimeEvent, ScriptVersion } from "@/lib/types";

/** 世界树 — 实体组 mock */
export const mockEntityGroups: EntityGroup[] = [
  {
    id: "eg-1",
    name: "玩家角色",
    entities: [
      {
        id: "e-1",
        name: "调查员",
        isPlayerControlled: true,
        attributeGroups: [
          {
            id: "ag-1",
            name: "基础属性",
            attributes: [
              { id: "a-1", name: "理智值", value: "75", isVisible: true },
              { id: "a-2", name: "体力", value: "90", isVisible: true },
              { id: "a-3", name: "手电电量", value: "67%", isVisible: true },
            ],
          },
          {
            id: "ag-2",
            name: "技能",
            attributes: [
              { id: "a-4", name: "调查", value: "熟练", isVisible: true },
              { id: "a-5", name: "潜行", value: "一般", isVisible: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eg-2",
    name: "NPC",
    entities: [
      {
        id: "e-2",
        name: "灯塔看守人",
        isPlayerControlled: false,
        attributeGroups: [
          {
            id: "ag-3",
            name: "基础属性",
            attributes: [
              { id: "a-6", name: "好感度", value: "中立", isVisible: true },
              { id: "a-7", name: "知晓内情", value: "是", isVisible: false },
            ],
          },
        ],
      },
      {
        id: "e-3",
        name: "失踪的孩子",
        isPlayerControlled: false,
        attributeGroups: [
          {
            id: "ag-4",
            name: "状态",
            attributes: [
              { id: "a-8", name: "位置", value: "未知", isVisible: true },
              { id: "a-9", name: "存活", value: "未知", isVisible: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "eg-3",
    name: "场景",
    entities: [
      {
        id: "e-4",
        name: "雾港灯塔",
        isPlayerControlled: false,
        attributeGroups: [
          {
            id: "ag-5",
            name: "环境",
            attributes: [
              { id: "a-10", name: "天气", value: "浓雾", isVisible: true },
              { id: "a-11", name: "时间", value: "深夜", isVisible: true },
            ],
          },
        ],
      },
    ],
  },
];

/** 词条树 mock */
export const mockEntryTree: Entry[] = [
  {
    id: "entry-1",
    title: "世界观设定",
    content: "故事发生在一座名为雾港的偏远港口小镇。这座小镇常年被浓雾笼罩，与外界联系稀少。镇上的灯塔已经废弃了二十年，但近来有居民声称夜晚看到灯塔亮起微光。",
    children: [
      {
        id: "entry-1-1",
        title: "历史背景",
        content: "雾港建于 19 世纪末，曾是繁忙的捕鲸港。1923 年一场神秘的大火后，港口逐渐衰落。",
        children: [],
      },
      {
        id: "entry-1-2",
        title: "守望之眼教派",
        content: "一个在 1923 年后从官方记录中消失的隐秘教派。他们的标记是铁门上的眼睛符号。",
        children: [],
      },
    ],
  },
  {
    id: "entry-2",
    title: "关键线索",
    content: "玩家需要在游戏中收集的线索清单。",
    children: [
      {
        id: "entry-2-1",
        title: "笔记本上的字迹",
        content: "主角笔记本上出现的不属于自己的字迹，写着'第三次'。",
        children: [],
      },
      {
        id: "entry-2-2",
        title: "孩子的脚印",
        content: "灯塔背面铁门旁发现的两套脚印之一，属于孩子。",
        children: [],
      },
    ],
  },
  {
    id: "entry-3",
    title: "结局分支",
    content: "根据玩家在第 17 回合的选择，故事将走向不同结局。",
    children: [],
  },
];

/** 持续状态 mock */
export const mockEditorPassiveStates: PassiveState[] = [
  { id: "ps-1", name: "记忆紊乱", icon: "brain", description: "每个关键节点触发一次记忆断层", initiallyVisible: false },
  { id: "ps-2", name: "浓雾笼罩", icon: "cloud", description: "视野受限，潜行检定难度降低", initiallyVisible: true },
  { id: "ps-3", name: "手电低电量", icon: "battery", description: "手电电量低于 30% 时触发", initiallyVisible: false },
];

/** 循环事件 mock */
export const mockEditorPeriodicEvents: PeriodicEvent[] = [
  { id: "pe-1", name: "雾气加深", frequency: 3, frequencyUnit: "turn", triggerTime: "深夜", description: "每 3 回合雾气加深一次，理智值 -5" },
  { id: "pe-2", name: "潮汐变化", frequency: 6, frequencyUnit: "turn", triggerTime: "深夜", description: "潮汐影响灯塔周围地形" },
];

/** 特别事件 mock */
export const mockEditorOneTimeEvents: OneTimeEvent[] = [
  { id: "ot-1", name: "记忆断层", triggerOnce: false, firstTrigger: "第 5 回合", description: "主角第一次失去记忆" },
  { id: "ot-2", name: "灯塔亮起", triggerOnce: true, firstTrigger: "第 10 回合", description: "废弃灯塔突然亮起灯光" },
];

/** 剧本版本列表 mock（编辑器侧栏用） */
export const mockEditorVersions: ScriptVersion[] = [
  {
    id: "sv-001",
    scriptId: "my-script-001",
    name: "v1.3",
    description: "新增第三幕'灯塔之下'内容",
    status: "pending",
    isLatest: true,
    isLatestPublished: false,
    createdAt: "2026-06-30T10:00:00Z",
    updatedAt: "2026-06-30T10:00:00Z",
  },
  {
    id: "sv-002",
    scriptId: "my-script-001",
    name: "v1.2",
    description: "已发布版本，修复了骰子检定逻辑",
    status: "published",
    isLatest: false,
    isLatestPublished: true,
    createdAt: "2026-06-20T10:00:00Z",
    updatedAt: "2026-06-28T14:30:00Z",
  },
  {
    id: "sv-003",
    scriptId: "my-script-001",
    name: "v1.1",
    description: "初版发布",
    status: "published",
    isLatest: false,
    isLatestPublished: false,
    createdAt: "2026-06-15T10:00:00Z",
    updatedAt: "2026-06-18T10:00:00Z",
  },
];
