// ==========================================================================
// Omnimundia Type System
// Derived from Vue 3 bundle analysis + 68-endpoint API map.
// All types mirror the original data models for faithful clone fidelity.
// ==========================================================================

/** 用户 */
export interface User {
  id: string;
  email: string;
  nickname: string;
  avatarUrl?: string;
  credits: number;
  isLoggedIn: boolean;
  profession?: Profession;
  createdAt: string;
}

/** 职业（来自调研问卷） */
export type Profession =
  | "角色扮演类游戏玩家"
  | "贴游玩家"
  | "设计从业者"
  | "科研人员"
  | "老师"
  | "服务业人员"
  | "自由职业"
  | "行政";

/** 剧本分类 */
export type ScriptGenre =
  | "言情"
  | "玄幻"
  | "科幻"
  | "现实"
  | "脑洞"
  | "全部";

/** 剧本标签 */
export interface ScriptTag {
  id: string;
  name: string;
}

/** 剧本 */
export interface Script {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  coverUrl?: string;
  desktopBackgroundUrl?: string;
  mobileBackgroundUrl?: string;
  tags: string[];
  genre: ScriptGenre;
  playerCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isEarlyAccess: boolean; // early-badge
  category: string;
  portalFeatured: boolean; // random-portal
  createdAt: string;
  updatedAt: string;
}

/** 剧本版本状态 */
export type VersionStatus =
  | "draft" // 草稿
  | "pending" // 待审
  | "published" // 已发布
  | "rejected"; // 未通过

/** 剧本版本 */
export interface ScriptVersion {
  id: string;
  scriptId: string;
  name: string;
  description: string;
  status: VersionStatus;
  isLatest: boolean;
  isLatestPublished: boolean;
  createdAt: string;
  updatedAt: string;
  rejectReason?: string;
}

/** 实体 */
export interface Entity {
  id: string;
  name: string;
  isPlayerControlled: boolean;
  attributeGroups: AttributeGroup[];
}

/** 实体组 */
export interface EntityGroup {
  id: string;
  name: string;
  entities: Entity[];
}

/** 属性 */
export interface Attribute {
  id: string;
  name: string;
  value?: string;
  isVisible: boolean;
}

/** 属性组 */
export interface AttributeGroup {
  id: string;
  name: string;
  attributes: Attribute[];
}

/** 词条（树形） */
export interface Entry {
  id: string;
  title: string;
  content?: string;
  children: Entry[];
}

/** 持续状态 (passive-state) */
export interface PassiveState {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  initiallyVisible: boolean;
}

/** 循环事件 (periodic-event) */
export interface PeriodicEvent {
  id: string;
  name: string;
  frequency: number;
  frequencyUnit: "turn" | "day" | "hour";
  triggerTime: string;
  endTime?: string;
  description?: string;
}

/** 特别事件 (one-time-event) */
export interface OneTimeEvent {
  id: string;
  name: string;
  triggerOnce: boolean;
  firstTrigger?: string;
  description?: string;
}

/** 随机项 */
export interface RandomItem {
  id: string;
  name: string;
  ranges: RandomRange[];
}

/** 随机项结果区间 */
export interface RandomRange {
  id: string;
  min: number;
  max: number;
  result: string;
}

/** 固定开局 */
export interface FixedOpening {
  enabled: boolean;
  description: string;
  openingTime?: string;
}

/** 骰子检定 */
export interface DiceCheck {
  enabled: boolean;
  diceCount: number;
  diceFaces: number;
  modifier: number;
  hitDescription?: string;
}

/** 规则配置 */
export interface RulesConfig {
  freedom: "open" | "guided"; // 自由开放
  weightHotScripts: boolean; // 给热门剧本更高的匹配权重
  weightNewScripts: boolean; // 给新剧本更高的匹配权重
  filterPlayedScripts: boolean; // 过滤掉已经玩过的剧本
  showBackground: boolean; // 有背景图就显示
}

/** 游戏回合变更类型 */
export type ChangeType = "added" | "changed" | "removed";

/** 回合变更项 */
export interface TurnChange {
  id: string;
  type: ChangeType;
  entityName: string;
  attributeName: string;
  oldValue?: string;
  newValue?: string;
}

/** 回合变更集（按类型分组） */
export interface TurnChangeSet {
  turn: number;
  added: TurnChange[];
  changed: TurnChange[];
  removed: TurnChange[];
}

/** 游戏选项（按钮） */
export interface GameOption {
  id: string;
  index: number;
  label: string;
  isDisabled: boolean;
}

/** 游戏回合数据 */
export interface TurnData {
  turn: number;
  time?: string;
  sceneContent: string; // 场景描述（markdown）
  options: GameOption[];
  changes: TurnChangeSet[];
  isProcessing: boolean;
}

/** 世界状态面板数据 */
export interface DashboardData {
  entities: Array<{
    name: string;
    attributes: Array<{ name: string; value: string; isVisible: boolean }>;
  }>;
  passiveStates: PassiveState[];
}

/** 存档 */
export interface GameSave {
  id: string;
  name: string;
  turn: number;
  versionName: string;
  time: string;
  isLatest: boolean;
  isActive: boolean;
  isAutoSave: boolean;
  description?: string;
}

/** 存档组 */
export interface SaveGroup {
  id: string;
  name: string;
  description?: string;
  saves: GameSave[];
}

/** 评论 */
export interface Comment {
  id: string;
  scriptId: string;
  author: string;
  authorAvatar?: string;
  content: string;
  images?: string[];
  time: string;
  likeCount: number;
  isLiked: boolean;
  replies: Comment[];
  replyTarget?: string;
}

/** OMI 聊天会话 */
export interface Conversation {
  id: string;
  title: string;
  time: string;
  messageCount: number;
}

/** OMI 聊天消息 */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  isLoading?: boolean;
  isReasoning?: boolean;
  isStreaming?: boolean;
}

/** OMI 长期记忆 */
export interface Memory {
  id: string;
  title: string;
  time: string;
  content: string;
}

/** 剧本审核 */
export interface ScriptReview {
  id: string;
  scriptVersionId: string;
  scriptTitle: string;
  author: string;
  authorAvatar?: string;
  authorEmail: string;
  versionName: string;
  description: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  rejectReason?: string;
  content?: string;
}

/** 钱包 / 积分 */
export interface Wallet {
  credits: number;
  transactions: PaymentOrder[];
}

/** 支付订单 */
export interface PaymentOrder {
  id: string;
  amount: number;
  credits: number;
  status: "pending" | "paid" | "failed";
  method: "alipay";
  createdAt: string;
}

/** 充值方案 */
export interface RechargeProduct {
  id: string;
  credits: number;
  price: number;
  isPopular: boolean;
  isEarlyAccess: boolean; // 首期特惠
  label?: string;
}

/** 顶栏导航项 */
export interface NavItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
}

/** 移动端底栏项 */
export interface BottomBarItem {
  key: string;
  label: string;
  path: string;
  icon: string;
}

/** 弹窗名称（对应原站 showModal store） */
export type ModalName =
  | "auth"
  | "recharge"
  | "shareCard"
  | "invite"
  | "accountSettings"
  | "saveSaves"
  | "loadSaves"
  | "rulesConfig"
  | "gameSettings"
  | "forgotPassword"
  | "mobileMine"
  | "officialGroup"
  | "survey"
  | "creationContest"
  | "randomPortal"
  | "scriptEdit";

/** 主题模式 */
export type ThemeMode = "light" | "dark";
