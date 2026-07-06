import type { Conversation, ChatMessage, Memory } from "@/lib/types";

/** OMI 聊天会话列表 mock */
export const mockConversations: Conversation[] = [
  { id: "conv-1", title: "雾港线索梳理", time: "2026-06-30T15:20:00Z", messageCount: 14 },
  { id: "conv-2", title: "角色动机讨论", time: "2026-06-29T20:00:00Z", messageCount: 8 },
  { id: "conv-3", title: "新聊天", time: "2026-06-28T10:00:00Z", messageCount: 2 },
];

/** OMI 聊天消息 mock */
export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    content: "这里是 Omi，待机中。欢迎和我聊任何事情或者咨询任何疑问——设定、规则、校对和玩家体验都可以交给我一起琢磨。需要我一起分析局势拟定行动的话，直接叫我就好。",
    time: "2026-06-30T15:00:00Z",
  },
  {
    id: "msg-2",
    role: "user",
    content: "我现在站在灯塔下面，铁门上有个眼睛符号，但我不记得自己是怎么到这里的。笔记本上多了一行不是我写的字。该怎么理解？",
    time: "2026-06-30T15:10:00Z",
  },
  {
    id: "msg-3",
    role: "assistant",
    content: "从当前的情况来看，你面前的铁门符号是'守望之眼'教派的标记。这个教派在 1923 年后就已经从官方记录中消失了，但灯塔看守人似乎知道些什么。\n\n我的建议是：在下去之前，先把灯塔外围搜索一遍。你手电只剩 67% 电量，贸然进入黑暗空间风险较大。另外，那页不知从何而来的笔记值得留意——'第三次'暗示你之前可能来过这里两次而不自知。",
    time: "2026-06-30T15:12:00Z",
  },
  {
    id: "msg-4",
    role: "user",
    content: "那三次记忆断层之间有没有什么联系？",
    time: "2026-06-30T15:15:00Z",
  },
  {
    id: "msg-5",
    role: "assistant",
    content: "我注意到你的记忆已经断层三次了。这不是普通的失忆——剧本里的'记忆紊乱'状态会在每个关键节点触发一次，意味着你正处在第四个关键抉择的入口。\n\n要不要我帮你梳理一下前面三次断层前后发生了什么？虽然你自己不记得，但世界线记录里有痕迹。",
    time: "2026-06-30T15:17:00Z",
  },
];

/** OMI 长期记忆 mock */
export const mockMemories: Memory[] = [
  {
    id: "mem-1",
    title: "玩家偏好悬疑克苏鲁风格",
    time: "2026-06-15T10:00:00Z",
    content: "该玩家偏好悬疑、克苏鲁风格剧本，喜欢调查与解谜。",
  },
  {
    id: "mem-2",
    title: "倾向稳妥探索而非冒险",
    time: "2026-06-20T14:00:00Z",
    content: "玩家在多回合中倾向先搜集信息再行动，较少选择高风险选项。",
  },
];
