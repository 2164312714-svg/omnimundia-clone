import type { Comment } from "@/lib/types";

/** 评论 mock 数据 */
export const mockComments: Comment[] = [
  {
    id: "comment-001",
    scriptId: "script-001",
    author: "推理爱好者",
    authorAvatar: undefined,
    content: "这个剧本的氛围营造太到位了！雾港的每一条巷子都感觉真的存在过。最后那个反转让我起了一身鸡皮疙瘩。",
    images: [],
    time: "2026-06-28T16:30:00Z",
    likeCount: 42,
    isLiked: false,
    replies: [
      {
        id: "comment-001-r1",
        scriptId: "script-001",
        author: "白 queen",
        authorAvatar: undefined,
        content: "谢谢喜欢！雾港的灵感来自我老家的一座渔港，小时候总觉得那里雾天特别神秘。",
        time: "2026-06-28T17:00:00Z",
        likeCount: 18,
        isLiked: false,
        replies: [],
        replyTarget: "推理爱好者",
      },
    ],
  },
  {
    id: "comment-002",
    scriptId: "script-001",
    author: "夜行者",
    authorAvatar: undefined,
    content: "Omi 助手真的太好用了，我卡关的时候让它帮我分析了一下线索，它不仅没剧透还引导我自己想到了关键点。这种 AI 辅助体验是别的平台没有的。",
    images: [],
    time: "2026-06-29T09:15:00Z",
    likeCount: 67,
    isLiked: true,
    replies: [],
  },
  {
    id: "comment-003",
    scriptId: "script-001",
    author: "剧本杀老玩家",
    authorAvatar: undefined,
    content: "作为贴游老玩家，这种 AI 推演的方式比固定选项自由太多了。我在第二回合做了一个完全意料之外的操作，系统居然真的接住了，而且后续剧情还呼应了。惊艳。",
    images: [],
    time: "2026-06-29T14:20:00Z",
    likeCount: 89,
    isLiked: false,
    replies: [
      {
        id: "comment-003-r1",
        scriptId: "script-001",
        author: "潮汐",
        content: "同感！这种'系统接得住'的感觉太上头了。",
        time: "2026-06-29T15:00:00Z",
        likeCount: 12,
        isLiked: false,
        replies: [],
        replyTarget: "剧本杀老玩家",
      },
    ],
  },
  {
    id: "comment-004",
    scriptId: "script-001",
    author: "新手村村长",
    authorAvatar: undefined,
    content: "刚接触这种形式，请问骰子检定是怎么用的？",
    images: [],
    time: "2026-06-30T10:00:00Z",
    likeCount: 5,
    isLiked: false,
    replies: [],
  },
];

/** 获取剧本评论 */
export function getCommentsByScriptId(scriptId: string): Comment[] {
  return mockComments.filter((c) => c.scriptId === scriptId);
}
