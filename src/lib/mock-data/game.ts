import type { TurnData, DashboardData, GameOption } from "@/lib/types";

/** 游戏选项 mock */
const gameOptions: GameOption[] = [
  { id: "opt-1", index: 1, label: "推开那扇锈迹斑斑的铁门，沿着楼梯向下走去", isDisabled: false },
  { id: "opt-2", index: 2, label: "先在灯塔周围搜索一番，看看有没有其他线索", isDisabled: false },
  { id: "opt-3", index: 3, label: "回到镇上的酒馆，向老渔民打听这座灯塔的历史", isDisabled: false },
  { id: "opt-4", index: 4, label: "拿出随身携带的笔记本，记录下当前的位置和时间", isDisabled: false },
];

/** 游戏回合数据 mock */
export const mockTurnData: TurnData = {
  turn: 15,
  time: "深夜 02:17",
  sceneContent: `浓雾从海面涌来，几乎吞噬了整座灯塔。你站在灯塔脚下，铁门半掩着，门内是一片深不见底的黑暗。

风很大，你裹紧了风衣。手电筒的光束在雾中只能照亮前方不到三米。

你注意到铁门的把手上刻着一个奇怪的符号——一只睁开的眼睛，瞳孔部分被一个向下的箭头贯穿。这个符号你在调查资料里见过，是本地一个已经消亡的教派的标记。

**你的记忆再次出现了短暂的断层。**你不记得自己是怎么到达灯塔的。上一刻你还在镇上的旅馆里翻看档案，下一刻就已经站在这里了。

口袋里的笔记本还在，但多了一页你从未写过的内容。上面只有一行字，墨迹很新：

> "第三次了。别再下去。"`,
  options: gameOptions,
  changes: [
    {
      turn: 15,
      added: [
        { id: "c1", type: "added", entityName: "调查员", attributeName: "记忆断层", newValue: "第 3 次" },
        { id: "c2", type: "added", entityName: "灯塔", attributeName: "符号", newValue: "睁眼·下箭" },
      ],
      changed: [
        { id: "c3", type: "changed", entityName: "调查员", attributeName: "位置", oldValue: "旅馆", newValue: "灯塔脚下" },
        { id: "c4", type: "changed", entityName: "调查员", attributeName: "手电电量", oldValue: "82%", newValue: "67%" },
      ],
      removed: [
        { id: "c5", type: "removed", entityName: "调查员", attributeName: "档案副本", oldValue: "随身携带" },
      ],
    },
  ],
  isProcessing: false,
};

/** 世界状态面板 mock */
export const mockDashboardData: DashboardData = {
  entities: [
    {
      name: "调查员",
      attributes: [
        { name: "理智值", value: "73/100", isVisible: true },
        { name: "体力", value: "中等", isVisible: true },
        { name: "手电电量", value: "67%", isVisible: true },
        { name: "记忆断层", value: "第 3 次", isVisible: true },
        { name: "随身物品", value: "笔记本、手电、风衣、手枪", isVisible: true },
      ],
    },
    {
      name: "灯塔看守人",
      attributes: [
        { name: "状态", value: "失踪", isVisible: true },
        { name: "最后出现", value: "3 天前", isVisible: true },
      ],
    },
  ],
  passiveStates: [
    { id: "ps1", name: "浓雾笼罩", description: "视野受限，感知检定难度 +2", initiallyVisible: true },
    { id: "ps2", name: "记忆紊乱", description: "每隔数回合触发一次记忆断层", initiallyVisible: true },
    { id: "ps3", name: "教派余波", description: "古老仪式的残留影响", initiallyVisible: false },
  ],
};

/** OMI 助手欢迎语 */
export const omiWelcomeMessages = [
  {
    role: "assistant" as const,
    content: "这里是 Omi，待机中。欢迎和我聊任何事情或者咨询任何疑问——设定、规则、校对和玩家体验都可以交给我一起琢磨。需要我一起分析局势拟定行动的话，直接叫我就好。",
  },
];

/** OMI 助手回复模板（模拟流式） */
export const omiResponseTemplates = [
  "从当前的情况来看，你面前的铁门符号是'守望之眼'教派的标记。这个教派在 1923 年后就已经从官方记录中消失了，但灯塔看守人似乎知道些什么。\n\n我的建议是：在下去之前，先把灯塔外围搜索一遍。你手电只剩 67% 电量，贸然进入黑暗空间风险较大。另外，那页不知从何而来的笔记值得留意——'第三次'暗示你之前可能来过这里两次而不自知。",
  "这个抉择点很有意思。从叙事结构看，'灯塔'是一个枢纽节点——无论你选择哪条路径，最终都会回到这里。区别在于你带着什么信息回来。\n\n如果你希望推进主线，向下走是最直接的；但作为游玩助手，我得提醒你：理智值已经掉到 73 了，在雾中长时间探索会持续消耗。回酒馆打听情报是更稳妥的选择。",
  "我注意到你的记忆已经断层三次了。这不是普通的失忆——剧本里的'记忆紊乱'状态会在每个关键节点触发一次，意味着你正处在第四个关键抉择的入口。\n\n要不要我帮你梳理一下前面三次断层前后发生了什么？虽然你自己不记得，但世界线记录里有痕迹。",
];
