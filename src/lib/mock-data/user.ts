import type { User, Wallet, RechargeProduct, SaveGroup } from "@/lib/types";

/** 当前登录用户（mock） */
export const currentUser: User = {
  id: "user-001",
  email: "2164312714@qq.com",
  nickname: "探索者",
  avatarUrl: undefined,
  credits: 320,
  isLoggedIn: true,
  profession: "角色扮演类游戏玩家",
  createdAt: "2026-06-01T10:00:00Z",
};

/** 未登录用户（mock） */
export const guestUser: User = {
  id: "",
  email: "",
  nickname: "",
  avatarUrl: undefined,
  credits: 0,
  isLoggedIn: false,
  createdAt: "",
};

/** 钱包 mock */
export const mockWallet: Wallet = {
  credits: 320,
  transactions: [
    {
      id: "order-001",
      amount: 18,
      credits: 200,
      status: "paid",
      method: "alipay",
      createdAt: "2026-06-15T10:00:00Z",
    },
    {
      id: "order-002",
      amount: 50,
      credits: 600,
      status: "paid",
      method: "alipay",
      createdAt: "2026-06-20T14:00:00Z",
    },
  ],
};

/** 充值方案 */
export const rechargeProducts: RechargeProduct[] = [
  { id: "p1", credits: 100, price: 9, isPopular: false, isEarlyAccess: true, label: "首期特惠" },
  { id: "p2", credits: 200, price: 18, isPopular: true, isEarlyAccess: false },
  { id: "p3", credits: 600, price: 50, isPopular: false, isEarlyAccess: false },
  { id: "p4", credits: 1200, price: 98, isPopular: false, isEarlyAccess: false, label: "永久" },
];

/** 游戏存档组 mock */
export const mockSaveGroups: SaveGroup[] = [
  {
    id: "group-1",
    name: "自动存档",
    description: "系统自动保存的世界线",
    saves: [
      {
        id: "save-auto-1",
        name: "第 15 回合",
        turn: 15,
        versionName: "v1.2",
        time: "2026-06-30T15:30:00Z",
        isLatest: true,
        isActive: true,
        isAutoSave: true,
      },
      {
        id: "save-auto-2",
        name: "第 10 回合",
        turn: 10,
        versionName: "v1.2",
        time: "2026-06-30T14:00:00Z",
        isLatest: false,
        isActive: false,
        isAutoSave: true,
      },
    ],
  },
  {
    id: "group-2",
    name: "我的存档",
    saves: [
      {
        id: "save-1",
        name: "关键抉择点",
        turn: 8,
        versionName: "v1.2",
        time: "2026-06-29T20:00:00Z",
        isLatest: false,
        isActive: false,
        isAutoSave: false,
        description: "在雾港入口的选择",
      },
      {
        id: "save-2",
        name: "真相前夕",
        turn: 14,
        versionName: "v1.2",
        time: "2026-06-30T10:00:00Z",
        isLatest: false,
        isActive: false,
        isAutoSave: false,
        description: "即将揭开谜底",
      },
    ],
  },
];
