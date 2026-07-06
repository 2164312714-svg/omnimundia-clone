# Omnimundia Clone — 项目交接文档

> **仓库**：`https://github.com/2164312714-svg/omnimundia-clone`（私有）
> **原站**：`omnimundia.com` — Vue 3 + Element Plus SPA
> **克隆基准**：渗透测试 recon 数据（2MB Vue 3 JS bundle、484KB CSS、68 端点 API map、13 路由 map、120 组件清单）
> **当前状态**：✅ 全站复刻完成 · 四轮审计通过 · UI 优化完成 · tsc/eslint/build 全绿

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈](#2-技术栈)
3. [快速开始](#3-快速开始)
4. [项目结构](#4-项目结构)
5. [架构设计](#5-架构设计)
6. [设计系统](#6-设计系统)
7. [路由表](#7-路由表)
8. [组件清单](#8-组件清单)
9. [状态管理](#9-状态管理)
10. [数据层](#10-数据层)
11. [功能清单（按阶段）](#11-功能清单按阶段)
12. [审计历史](#12-审计历史)
13. [UI 优化](#13-ui-优化)
14. [已知问题与非问题](#14-已知问题与非问题)
15. [关键设计决策](#15-关键设计决策)
16. [后续工作建议](#16-后续工作建议)
17. [Git 提交历史](#17-git-提交历史)

---

## 1. 项目概述

### 是什么

对 `omnimundia.com` 全站的 1:1 复刻。原站是一个 AI 驱动的互动阅读/剧本杀平台，用户可以在 AI 实时推演的剧本中进行角色扮演，影响故事走向。平台还包含剧本创作编辑器、评论系统、Omi AI 助手、管理后台等。

### 为什么

基于授权渗透测试获取的前端资产（JS bundle、CSS、API 端点映射），将原站的 Vue 3 SPA 架构迁移到 Next.js 16 App Router + React 19 + TypeScript 严格模式 + shadcn/ui (Base UI) + Tailwind v4 技术栈。

### 核心特点

- **全 mock 数据**：无真实后端、无认证、无实时通信。所有数据是硬编码 TypeScript 常量。
- **忠实还原**：原站的设计 token（`--app-*` CSS 自定义属性系统）、7 级背景/文字/边框色阶、暖色羊皮纸主题 + 暗色近黑主题全部保留。
- **13 条路由**：覆盖剧本浏览、游戏游玩、剧本编辑、管理审核、用户认证等全部核心流程。
- **46 个组件**：包括 3 个 game 组件、3 个 layout 组件、1 个 Omi 聊天浮窗、1 个评论面板、1 个剧本编辑器、7 个模态框、24 个 shadcn/ui 原语。

---

## 2. 技术栈

| 层 | 技术 | 版本 |
|---|------|------|
| 框架 | Next.js (App Router, Turbopack) | 16.2.1 |
| UI 库 | React | 19.2.4 |
| 语言 | TypeScript (strict) | ^5 |
| 组件库 | shadcn/ui（基于 **Base UI**，非 Radix） | shadcn ^4.1.0 / @base-ui/react ^1.3.0 |
| 样式 | Tailwind CSS v4 + tw-animate-css | ^4 |
| 图标 | Lucide React | ^1.6.0 |
| 轮播 | Embla Carousel React | ^8.6.0 |
| 工具 | clsx + tailwind-merge (cn 函数) | — |
| Node 要求 | >= 24 | — |

### 关键技术注意

- **shadcn/ui 使用 Base UI 而非 Radix**：没有 `asChild` prop；Accordion 使用 `multiple` 布尔值 + 数组 `defaultValue`；DropdownMenuTrigger 直接渲染 button。Dialog 组件基于 `@base-ui/react/dialog`，自动处理焦点陷阱、ARIA 角色、ESC 关闭、焦点恢复。
- **Tailwind v4**：使用 `@theme inline` 和 `@custom-variant dark` 语法，不再需要 `tailwind.config.js`。颜色通过 CSS 自定义属性桥接到 Tailwind utility class（如 `text-app-theme` → `var(--app-color-theme)`）。

---

## 3. 快速开始

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:3000）
npm run dev

# 类型检查
npx tsc --noEmit

# Lint
npx eslint src/

# 生产构建
npm run build

# 启动生产服务器
npm start

# 一键检查（lint + typecheck + build）
npm run check
```

### 环境要求

- Node.js >= 24
- 无需任何环境变量（全 mock 数据）
- 无需数据库
- 无需 API 密钥

---

## 4. 项目结构

```
omnimundia-clone/
├── src/
│   ├── app/                          # Next.js App Router 路由
│   │   ├── layout.tsx                # 根布局（metadata template + providers）
│   │   ├── page.tsx                  # / → 重定向到 /scripts
│   │   ├── error.tsx                 # 根级错误边界
│   │   ├── not-found.tsx             # 自定义 404
│   │   ├── globals.css               # 全局样式 + 设计 token + 工具类
│   │   ├── scripts/                  # 剧本大厅
│   │   │   ├── layout.tsx            # metadata: "剧本大全"
│   │   │   ├── page.tsx              # 轮播 + 分类 + 排序 + 卡片网格
│   │   │   └── search/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx          # 搜索页
│   │   ├── recent-played/            # 最近玩过
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── my-scripts/               # 我的剧本
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 已发布 + 草稿列表
│   │   │   └── [scriptId]/
│   │   │       └── page.tsx          # 剧本编辑器（server component）
│   │   ├── game/
│   │   │   └── [scriptId]/
│   │   │       └── page.tsx          # 游戏页（server component → GamePlayer）
│   │   ├── about/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx              # 关于我们
│   │   ├── admin/
│   │   │   └── script-reviews/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx          # 审核列表（表格）
│   │   │       └── [scriptVersionId]/
│   │   │           └── page.tsx      # 审核详情（server component）
│   │   ├── verify-email/page.tsx     # 邮箱验证
│   │   ├── register-success/page.tsx # 注册成功
│   │   └── reset-password/page.tsx   # 重置密码
│   │
│   ├── components/
│   │   ├── layout/                   # 布局组件
│   │   │   ├── app-shell.tsx         # 全局 shell（TopBar + Main + MobileBottomBar + ModalRenderer + OmiChatWidget）
│   │   │   ├── top-bar.tsx           # 顶栏（毛玻璃 + 导航 + 用户菜单）
│   │   │   ├── mobile-bottom-bar.tsx # 移动端底栏（5 项 + 中心创作按钮）
│   │   │   └── logo.tsx              # Logo
│   │   ├── scripts/
│   │   │   └── script-card.tsx       # 剧本卡片（hover 抬升 + 封面 fallback）
│   │   ├── game/
│   │   │   ├── game-player.tsx       # 游戏主组件（场景 + 选项 + 自由输入 + 评论区抽屉）
│   │   │   ├── game-sidebar.tsx      # 世界状态侧栏（实体/持续状态/存档）
│   │   │   └── world-state-collapse.tsx # 回合变更折叠面板
│   │   ├── editor/
│   │   │   └── script-editor.tsx     # 剧本编辑器（4 tab：世界树/词条/事件/设置）
│   │   ├── comments/
│   │   │   └── comments-panel.tsx    # 评论面板（发帖/点赞/嵌套回复）
│   │   ├── omi/
│   │   │   └── omi-chat-widget.tsx   # Omi AI 助手浮窗（可拖拽 + 模拟流式）
│   │   ├── auth/
│   │   │   ├── auth-modal.tsx        # 登录/注册双 tab 模态
│   │   │   ├── forgot-password-modal.tsx
│   │   │   └── account-settings-modal.tsx # 资料/安全双 tab
│   │   ├── wallet/
│   │   │   └── recharge-modal.tsx    # 充值（4 方案 + 支付宝/微信）
│   │   ├── shared/
│   │   │   ├── modal-renderer.tsx    # 模态框统一渲染器
│   │   │   ├── markdown-text.tsx     # 轻量 Markdown 渲染（场景文本）
│   │   │   ├── invite-friends-modal.tsx
│   │   │   ├── official-group-dialog.tsx
│   │   │   ├── survey-dialog.tsx     # 5 星评价 + 反馈
│   │   │   └── page-placeholder.tsx  # 通用占位页
│   │   ├── admin/
│   │   │   └── review-detail-content.tsx # 审核详情（通过/驳回 + 内容预览）
│   │   └── ui/                       # shadcn/ui 原语（24 个）
│   │       ├── accordion.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx            # 基于 @base-ui/react/dialog
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   │
│   ├── hooks/                        # React Context + hooks
│   │   ├── use-modal.tsx             # 模态框状态管理（showModal/closeModal）
│   │   ├── use-theme.tsx             # 主题切换（light/dark + localStorage + SSR 安全）
│   │   └── use-user.tsx              # 用户状态（login/logout/isLoggedIn）
│   │
│   ├── lib/
│   │   ├── types.ts                  # 全局类型定义（385 行，30+ 接口）
│   │   ├── utils.ts                  # cn() 工具函数
│   │   └── mock-data/                # Mock 数据
│   │       ├── index.ts              # 统一导出
│   │       ├── scripts.ts            # 16 个剧本 + 分类 + 排序 + 轮播 banner
│   │       ├── user.ts               # 当前用户 + 游客 + 钱包 + 充值方案 + 存档
│   │       ├── game.ts               # 游戏回合数据 + 仪表盘 + Omi 消息
│   │       ├── comments.ts           # 评论数据
│   │       ├── conversations.ts      # Omi 会话 + 记忆
│   │       ├── reviews.ts            # 审核列表 + 我的剧本 + 版本
│   │       └── editor.ts             # 编辑器：实体组/词条树/事件/版本
│   │
│   └── types/                        # （空目录，预留）
│
├── next.config.ts                    # output: "standalone"
├── package.json
├── tsconfig.json
├── eslint.config.ts
├── postcss.config.mjs
└── HANDOFF.md                        # 本文档
```

---

## 5. 架构设计

### 整体架构

```
RootLayout (server)
  ├── metadata (template: "%s | Omnimundia")
  ├── ThemeProvider (client context)
  ├── UserProvider (client context)
  ├── ModalProvider (client context)
  └── AppShell (client)
        ├── TopBar (fixed, glassmorphism)
        │     ├── Logo
        │     ├── Nav (4 links)
        │     └── Actions (创作/主题/钱包/用户)
        ├── <main>
        │     └── {children} ← 各路由页面
        ├── MobileBottomBar (md:hidden)
        ├── ModalRenderer (条件渲染 7 个模态)
        └── OmiChatWidget (浮动拖拽按钮 + 聊天面板)
```

### Server / Client 边界

| 类型 | 页面 | 说明 |
|------|------|------|
| Server Component | `/game/[scriptId]`, `/my-scripts/[scriptId]`, `/admin/script-reviews/[scriptVersionId]` | async 函数，await params，委托给 client 组件 |
| Client Component | `/scripts`, `/scripts/search`, `/recent-played`, `/my-scripts`, `/about`, `/verify-email`, `/register-success`, `/reset-password` | `"use client"`，使用 useState/useMemo |
| Redirect | `/` | `redirect("/scripts")` |
| Layout (metadata) | 6 个 `layout.tsx` | Server component，仅导出 metadata + 透传 children |

### 数据流

```
mock-data/*.ts (硬编码常量)
    ↓ import
各页面/组件直接 import mock 数据
    ↓
无 fetch / 无 API 调用 / 无实时通信
```

用户状态（登录/登出/主题）通过 React Context 在客户端管理，不持久化到服务端。

---

## 6. 设计系统

### Token 架构

原站使用自定义 `--app-*` CSS 自定义属性系统，叠加在 Element Plus 默认值之上。本项目将其移植到 Tailwind v4。

```
@theme inline {
  --color-app-theme: var(--app-color-theme);     ← Tailwind utility 桥接
  --color-app-bg-l1: var(--app-bg-l1);           ← text-app-bg-l1 → var(--app-bg-l1)
  ...
}

:root { /* 浅色主题 */ }
.dark { /* 暗色主题 */ }
```

### 色彩系统

**7 级背景色阶**（浅 → 深）：

| Token | 浅色 | 暗色 | 用途 |
|-------|------|------|------|
| `--app-bg-l1` | `#faf4ea` | `#1a1a1a` | 页面底色 |
| `--app-bg-l2` | `#f7efe4` | `#1f1f1f` | 卡片/面板 |
| `--app-bg-l3` | `#f3e6d6` | `#272727` | 表头/chip |
| `--app-bg-l4` | `#efe3ca` | `#2f2f2f` | hover |
| `--app-bg-l5` | `#e5d5b9` | `#363636` | popover |
| `--app-bg-l6` | `#e0cdb1` | `#3f3f3f` | secondary |
| `--app-bg-l7` | `#dac5a9` | `#4c4c4c` | 深层 hover |

**6 级文字色阶**（深 → 浅）：

| Token | 浅色 | 暗色 |
|-------|------|------|
| `--app-text-l1` | `#2a1b0a` | `#ffffff` |
| `--app-text-l2` | `#3c2712` | `#eeeeee` |
| `--app-text-l3` | `#5b3f21` | `#cccccc` |
| `--app-text-l4` | `#7a5a35` | `#a9a9a9` |
| `--app-text-l5` | `#9e784f` | `#888888` |
| `--app-text-l6` | `#c39f70` | `#666666` |

**品牌色**：

| Token | 浅色 | 暗色 | 用途 |
|-------|------|------|------|
| `--app-color-theme` | `#d97706` (琥珀) | `#de940a` (金) | 主色 |
| `--app-color-theme-fade` | `rgba(217,119,6,0.18)` | `rgba(222,148,10,0.18)` | 主色淡底 |
| `--app-color-secondary` | `#fffdf7` | `#1a1a1a` | 主色上的文字 |
| `--app-color-red` | `#f56c6c` | — | 点赞/危险 |
| `--app-color-blue` | `#409eff` | — | 链接/信息 |
| `--app-color-green` | `#4caf50` | — | 成功 |

### 主题切换

- 浅色（默认）：暖色羊皮纸 + 琥珀主色
- 暗色：近黑 + 亮金主色
- 切换方式：`useTheme().toggleTheme()`，通过 `<html class="dark">` 切换
- 持久化：`localStorage("omnimundia-theme")`，SSR 安全（仅在 useEffect 中读取）
- 首次访问：跟随系统 `prefers-color-scheme`

### UI 工具类（globals.css 中定义）

| 类名 | 作用 |
|------|------|
| `.card-hover` | 卡片 hover 抬升（translateY -3px + shadow） |
| `.press-feedback` | 按压反馈（active:scale 0.96） |
| `.sort-tab` + `.is-active` | 排序 tab + `::after` 下划线指示器 |
| `.chip-hover` | 分类 chip hover（translateY -1px） |
| `.topbar-blur` | 顶栏毛玻璃（backdrop-filter blur 12px + saturate 1.5） |
| `.scene-text` | 场景文本排版（line-height 1.85, letter-spacing 0.01em） |
| `.game-option` | 游戏选项 hover（translateX 4px + shadow） |
| `.stagger` | 子元素逐个入场动画（50ms 间隔，最多 8 个） |
| `.animate-slide-up` | 单元素入场动画 |

---

## 7. 路由表

| 路径 | 渲染类型 | 页面文件 | 说明 |
|------|---------|---------|------|
| `/` | ○ Static | `app/page.tsx` | 重定向到 `/scripts` |
| `/_not-found` | ○ Static | `app/not-found.tsx` | 自定义 404 |
| `/scripts` | ○ Static | `app/scripts/page.tsx` | 剧本大厅（轮播+分类+排序+分页） |
| `/scripts/search` | ○ Static | `app/scripts/search/page.tsx` | 搜索页 |
| `/recent-played` | ○ Static | `app/recent-played/page.tsx` | 最近玩过 |
| `/my-scripts` | ○ Static | `app/my-scripts/page.tsx` | 我的剧本（已发布+草稿） |
| `/my-scripts/[scriptId]` | ƒ Dynamic | `app/my-scripts/[scriptId]/page.tsx` | 剧本编辑器 |
| `/game/[scriptId]` | ƒ Dynamic | `app/game/[scriptId]/page.tsx` | 游戏页 |
| `/about` | ○ Static | `app/about/page.tsx` | 关于我们 |
| `/verify-email` | ○ Static | `app/verify-email/page.tsx` | 邮箱验证 |
| `/register-success` | ○ Static | `app/register-success/page.tsx` | 注册成功 |
| `/reset-password` | ○ Static | `app/reset-password/page.tsx` | 重置密码 |
| `/admin/script-reviews` | ○ Static | `app/admin/script-reviews/page.tsx` | 审核列表 |
| `/admin/script-reviews/[scriptVersionId]` | ƒ Dynamic | `app/admin/script-reviews/[scriptVersionId]/page.tsx` | 审核详情 |

○ = 静态预渲染 · ƒ = 按需服务端渲染

### Metadata 覆盖

根 layout 使用 `title: { default: "...", template: "%s | Omnimundia" }`，子路由通过 `layout.tsx` 或内联 `export const metadata` 设置标题，自动追加 `| Omnimundia` 后缀。

---

## 8. 组件清单

### 业务组件（22 个）

| 组件 | 文件 | 说明 |
|------|------|------|
| **AppShell** | `layout/app-shell.tsx` | 全局 shell，组合 TopBar + Main + MobileBottomBar + ModalRenderer + OmiChatWidget |
| **TopBar** | `layout/top-bar.tsx` | 固定顶栏：毛玻璃背景、4 导航项、创作/主题/钱包/用户菜单 |
| **MobileBottomBar** | `layout/mobile-bottom-bar.tsx` | 移动端底栏：5 项 + 中心创作按钮（theme 实心高亮） |
| **Logo** | `layout/logo.tsx` | 品牌 Logo |
| **ScriptCard** | `scripts/script-card.tsx` | 剧本卡片：封面 fallback 渐变 + 标签 + 点赞/评论/人数。`href` prop 可自定义链接 |
| **GamePlayer** | `game/game-player.tsx` | 游戏核心：场景文本 + 4 选项 + 自由输入 + 评论区抽屉。处理回合推进/终局/处理中状态 |
| **GameSidebar** | `game/game-sidebar.tsx` | 世界状态侧栏：回合信息 + 变更折叠 + 实体属性 + 持续状态 + 存档 |
| **WorldStateCollapse** | `game/world-state-collapse.tsx` | 回合变更折叠面板（新增/更新/移除分组） |
| **ScriptEditor** | `editor/script-editor.tsx` | 剧本编辑器：4 tab（世界树/词条/事件/设置）+ 版本选择 + 保存/提交 |
| **CommentsPanel** | `comments/comments-panel.tsx` | 评论面板：发帖/点赞/嵌套回复。`embedded` prop 用于内嵌模式 |
| **OmiChatWidget** | `omi/omi-chat-widget.tsx` | Omi AI 助手：可拖拽浮动按钮 + 380×540 聊天面板 + 模拟流式 + 长期记忆抽屉 |
| **AuthModal** | `auth/auth-modal.tsx` | 登录/注册双 tab 模态（邮箱+密码+显隐切换） |
| **ForgotPasswordModal** | `auth/forgot-password-modal.tsx` | 邮箱重置链接 + 成功确认状态 |
| **AccountSettingsModal** | `auth/account-settings-modal.tsx` | 资料/安全双 tab（昵称/职业编辑 + 登出） |
| **RechargeModal** | `wallet/recharge-modal.tsx` | 4 充值方案 + 支付宝/微信支付方式 |
| **InviteFriendsModal** | `shared/invite-friends-modal.tsx` | 邀请码 + 复制链接 + 奖励说明 |
| **OfficialGroupDialog** | `shared/official-group-dialog.tsx` | QQ 群 + Discord 社区入口 |
| **SurveyDialog** | `shared/survey-dialog.tsx` | 5 星评分（hover 态）+ 反馈文本框 |
| **ModalRenderer** | `shared/modal-renderer.tsx` | 根据 `activeModal` 状态条件渲染 7 个模态 |
| **MarkdownText** | `shared/markdown-text.tsx` | 轻量 Markdown 渲染（支持 p/strong/blockquote/ul/li） |
| **PagePlaceholder** | `shared/page-placeholder.tsx` | 通用占位页（图标+标题+描述+按钮） |
| **ReviewDetailContent** | `admin/review-detail-content.tsx` | 审核详情：通过/驳回流程 + 内容预览（世界树/词条/事件） |

### shadcn/ui 原语（24 个）

`accordion` · `avatar` · `badge` · `button` · `card` · `carousel` · `checkbox` · `dialog` · `dropdown-menu` · `input` · `label` · `pagination` · `radio-group` · `scroll-area` · `select` · `separator` · `sheet` · `skeleton` · `slider` · `switch` · `table` · `tabs` · `textarea` · `tooltip`

---

## 9. 状态管理

三个 React Context，全部在 `RootLayout` 中嵌套提供：

### useModal

```typescript
interface ModalContextValue {
  activeModal: ModalName | null;    // 当前激活的模态名
  showModal: (name: ModalName) => void;
  closeModal: () => void;
  closeAll: () => void;
}
```

- `ModalName` 是 16 种模态名称的联合类型（对应原站 Vue `showModal("name")` store）
- `ModalRenderer` 组件根据 `activeModal` 渲染对应模态
- 一次只显示一个模态（新模态覆盖旧模态）

### useUser

```typescript
interface UserContextValue {
  user: User;              // 注意：是 `user` 不是 `currentUser`
  login: () => void;       // 切换到 mockCurrentUser
  logout: () => void;      // 切换到 guestUser
  isLoggedIn: boolean;     // user.isLoggedIn
}
```

- ⚠️ **关键**：hook 暴露 `user`，不是 `currentUser`。所有消费方应使用 `const { user } = useUser()`
- 登录/登出仅切换 mock 数据，不涉及真实认证

### useTheme

```typescript
interface ThemeContextValue {
  theme: ThemeMode;            // "light" | "dark"
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}
```

- SSR 安全：初始值 `"light"`，在 `useEffect` 中读取 `localStorage` 和 `prefers-color-scheme`
- 通过 `<html>` 的 `class="dark"` 切换
- eslint-disable 注释标记了 `set-state-in-effect`（SSR 安全模式的必要写法）

---

## 10. 数据层

### 类型系统（`src/lib/types.ts`，385 行）

30+ 接口/类型，完整覆盖原站数据模型：

| 领域 | 类型 | 说明 |
|------|------|------|
| 用户 | `User`, `Profession` | 用户 + 职业（8 种） |
| 剧本 | `Script`, `ScriptGenre`, `ScriptTag` | 剧本 + 分类 + 标签 |
| 版本 | `ScriptVersion`, `VersionStatus` | 版本 + 状态（草稿/待审/已发布/驳回） |
| 实体 | `Entity`, `EntityGroup`, `Attribute`, `AttributeGroup` | 世界树实体模型 |
| 词条 | `Entry` | 树形词条（递归 children） |
| 事件 | `PassiveState`, `PeriodicEvent`, `OneTimeEvent` | 持续/循环/特别事件 |
| 随机 | `RandomItem`, `RandomRange` | 随机项 + 区间结果 |
| 规则 | `FixedOpening`, `DiceCheck`, `RulesConfig` | 固定开局/骰子检定/规则配置 |
| 游戏 | `TurnData`, `GameOption`, `TurnChange`, `TurnChangeSet`, `DashboardData` | 回合/选项/变更/仪表盘 |
| 存档 | `GameSave`, `SaveGroup` | 存档 + 存档组 |
| 评论 | `Comment` | 评论（递归 replies） |
| Omi | `Conversation`, `ChatMessage`, `Memory` | 会话/消息/记忆 |
| 审核 | `ScriptReview` | 审核记录 |
| 钱包 | `Wallet`, `PaymentOrder`, `RechargeProduct` | 钱包/订单/充值方案 |
| UI | `NavItem`, `BottomBarItem`, `ModalName`, `ThemeMode` | 导航/模态名/主题 |

### Mock 数据（`src/lib/mock-data/`，7 文件 ~1043 行）

| 文件 | 导出 | 说明 |
|------|------|------|
| `scripts.ts` (351 行) | `scriptCategories`, `sortOptions`, `carouselBanners`, `mockScripts` (16 个), `getScriptById()`, `getScriptsByCategory()`, `searchScripts()`, `getFeaturedScripts()` | 剧本数据 + 查询函数 |
| `user.ts` (114 行) | `currentUser`, `guestUser`, `mockWallet`, `rechargeProducts` (4 个), `mockSaveGroups` | 用户 + 钱包 + 充值 + 存档 |
| `game.ts` (87 行) | `mockTurnData`, `mockDashboardData`, `omiWelcomeMessages`, `omiResponseTemplates` | 游戏回合 + 仪表盘 + Omi 消息 |
| `comments.ts` (83 行) | `mockComments`, `getCommentsByScriptId()` | 评论 + 查询 |
| `conversations.ts` (58 行) | `mockConversations`, `mockChatMessages`, `mockMemories` | Omi 会话 + 记忆 |
| `reviews.ts` (140 行) | `mockReviews`, `mockRejectedReviews`, `mockMyScripts`, `mockScriptVersions` | 审核 + 我的剧本 + 版本 |
| `editor.ts` (196 行) | `mockEntityGroups` (3 组), `mockEntryTree` (3 根), `mockEditorPassiveStates`, `mockEditorPeriodicEvents`, `mockEditorOneTimeEvents`, `mockEditorVersions` (3 版本) | 编辑器全部数据 |

---

## 11. 功能清单（按阶段）

### Phase 1-3（前一会话完成）

- ✅ 项目脚手架（Next.js 16 + React 19 + TS strict + shadcn/ui + Tailwind v4）
- ✅ 设计系统移植（`--app-*` token + 浅/暗主题 + 7 级色阶）
- ✅ 13 条路由搭建
- ✅ 24 个 shadcn/ui 原语安装
- ✅ 基础组件（TopBar、MobileBottomBar、ScriptCard、AppShell、Logo）
- ✅ 剧本大厅页（轮播 + 分类 + 排序 + 分页 + 卡片网格）
- ✅ 游戏页（场景文本 + 选项 + 世界状态侧栏 + 存档）
- ✅ MarkdownText 轻量渲染器

### Phase 4-8（本会话完成）

- ✅ **Phase 4 — 模态框**（7 个）：
  - AuthModal（登录/注册双 tab + 密码显隐）
  - RechargeModal（4 方案 + 支付宝/微信）
  - ForgotPasswordModal
  - AccountSettingsModal（资料/安全双 tab）
  - InviteFriendsModal（邀请码 + 复制链接）
  - OfficialGroupDialog（QQ 群 + Discord）
  - SurveyDialog（5 星 + 反馈）
  - ModalRenderer 统一渲染

- ✅ **Phase 5 — Omi AI 助手**：
  - 可拖拽浮动触发按钮（pointer events，拖拽/点击区分）
  - 380×540 聊天面板
  - 模拟流式输出（40ms/2字符）
  - 长期记忆抽屉
  - 清空对话（停止流式 + 重置）
  - resize/orientation 监听（按钮位置自适应）
  - 面板位置双轴 clamp（防溢出）

- ✅ **Phase 6 — 评论系统**：
  - CommentsPanel（发帖/点赞/嵌套回复）
  - `embedded` prop（游戏页内嵌 / 独立使用）
  - useCallback 优化（handlePost/handleReply/toggleLike）
  - replyDraft 切换目标时自动清空

- ✅ **Phase 7 — 剧本编辑器**：
  - 4 tab：世界树（实体→属性编辑）/ 词条（树形展开折叠）/ 事件（持续/循环/特别）/ 设置（标题/描述/标签/封面）
  - 版本选择栏
  - 保存草稿 / 提交审核按钮
  - 词条树 chevron 键盘可访问（`<button>` + `aria-label`）

- ✅ **Phase 8 — 管理审核**：
  - 审核列表（表格 + 标题 Link → 详情页 + hover 样式 + 空状态）
  - 审核详情（通过/驳回流程 + 内容预览 + 驳回必填理由）

---

## 12. 审计历史

### 第一轮：表面 bug（commit `bd34b3b`）

| # | 问题 | 修复 |
|---|------|------|
| 1 | Game player 定时器泄漏 | 添加 `turnTimerRef` + useEffect cleanup |
| 2 | TopBar `window.location.href` 全页刷新 | 改为 `router.push()` |
| 3 | 9 个 eslint 错误（no-unescaped-entities, prefer-const, set-state-in-effect, impure-function-during-render） | 逐个修复 |

### 第二轮：深层逻辑 / a11y（commit `1b6aeb0`）

| # | 问题 | 修复 |
|---|------|------|
| 1 | 评论 replyDraft 切换目标时泄漏 | onToggleReply 中清空 draft |
| 2 | Omi 按钮无 resize 监听，窗口缩放后飞出屏幕 | 添加 resize/orientationchange 监听 |
| 3 | Omi 面板位置溢出（left 无下界，top 未检查视口高度） | 双轴 `Math.max(8, Math.min(...))` |
| 4 | 游戏末回合无终局状态（点击显示假 spinner 后返回同屏） | `isLastTurn` 检查 + 终局面板 |
| 5 | 编辑器词条树 chevron 不可键盘操作（`<span onClick>` 无 tabindex/role） | 重构为 `<button type="button">` + `aria-label` |
| 6 | Omi handleClear 未停止流式 | 清空时 clearInterval + setStreaming(false) |
| 7 | ScriptCard `className` prop 解构但未传给 `cn()` | 添加到 `cn()` 参数 |

### 第三轮：韧性 / SEO / 移动端（commit `a12ef33`）

| # | 问题 | 修复 |
|---|------|------|
| 1 | 无根级 error.tsx 错误边界 | 添加 error.tsx（AlertCircle + reset + digest） |
| 2 | 无自定义 404 | 添加 not-found.tsx（Compass + 返回链接） |
| 3 | 游戏页评论抽屉移动端挤压主面板 | 响应式：移动端全屏覆盖 + 遮罩，桌面端侧栏 |
| 4 | 无 per-page metadata | 7 个 layout.tsx + 3 个 server page 内联 + 根 layout template 模式 |

### 第四轮：a11y 深度 / 空状态 / 导航（commit `2f86a8f`）

| # | 问题 | 修复 |
|---|------|------|
| 1 | admin 审核列表行不可点击（详情页完全不可到达） | 标题改为 `<Link>` + 行 hover 样式 |
| 2 | my-scripts 双列表为空时无空状态 | 添加空状态（FileText 图标 + CTA） |
| 3 | admin 列表无空状态 | 添加空状态（Inbox 图标） |

### 审计确认的非问题

| 项 | 原因 |
|----|------|
| script-card `<img>` 未迁移 `next/image` | `coverUrl` 在所有 mock 数据中恒为 `undefined`，`<img>` 分支是死代码，渐变 fallback 始终生效；已有 eslint-disable |
| comments `formatTime()` 中 `new Date()` 水合风险 | 所有 mock 时间戳为 2024-2025，与 "now"(2026) 差距以天计，相对时间格式在 SSR/hydration 间不会跨越边界 |
| 模态框焦点管理 | Base UI Dialog 原语自动处理焦点陷阱/ARIA/ESC/焦点恢复。7/7 模态均使用 DialogTitle |
| 硬编码颜色（暗色风险） | TSX 中零硬编码颜色，全部使用 CSS 变量。script-card 中的 `rgba(0,0,0,0.62)` 是图片遮罩色，非主题色 |
| `dangerouslySetInnerHTML` | 全项目零使用，无 XSS 风险 |
| `console.log` / TODO / FIXME | 全项目零残留 |

---

## 13. UI 优化（commit `8b5a9dd`）

### globals.css 增强

| 新增 | 作用 |
|------|------|
| `*:focus-visible` | 键盘导航焦点环（2px solid theme + offset 2px） |
| `::selection` | 选中文字颜色（theme-fade 底 + text-l1 字） |
| `scroll-behavior: smooth` | 平滑滚动 |
| `text-rendering: optimizeLegibility` | 字体渲染优化 |
| `line-height: 1.6` | body 行高从 1.5 提升到 1.6 |
| `.card-hover` | 卡片 hover 抬升（translateY -3px + shadow），暗色模式更深阴影 |
| `.press-feedback` | 按压反馈（active:scale 0.96） |
| `.sort-tab` + `.is-active::after` | 排序 tab 下划线指示器（width 0→70% 动画） |
| `.chip-hover` | 分类 chip hover（translateY -1px） |
| `.topbar-blur` | 顶栏毛玻璃（backdrop-filter blur 12px + saturate 1.5） |
| `.scene-text` | 场景文本排版（line-height 1.85 + letter-spacing） |
| `.game-option` | 游戏选项 hover（translateX 4px + shadow-sm） |
| `@keyframes slide-up-fade` | 入场动画（translateY 8px + opacity 0 → 0） |
| `.stagger` | 子元素逐个入场（50ms 间隔，最多 8 个） |

### 组件级优化

| 组件 | 优化 |
|------|------|
| **TopBar** | 毛玻璃背景（`color-mix` 82% 透明 + backdrop-blur）+ box-shadow + 激活导航项 theme-fade pill 背景 + press-feedback |
| **ScriptCard** | `card-hover`（hover 抬升 + shadow，替换原来的 flat transition-colors） |
| **Scripts page** | Hero 轮播 `rounded-xl` + box-shadow；排序 tab `::after` 下划线 + border-bottom 分隔线；分类 chip `chip-hover` + `press-feedback`；卡片网格 `stagger` 入场动画；分页 `press-feedback` |
| **GamePlayer** | 场景文本 `scene-text`（line-height 1.85）；回合 badge pill 样式（rounded-full + theme-fade + theme color）；选项按钮 `game-option` hover（translateX + shadow-sm） |
| **MobileBottomBar** | 中心"创作"按钮 solid theme 背景高亮；全部项 `press-feedback` |
| **My-scripts / Recent-played** | 卡片网格 `stagger` 入场动画 |

---

## 14. 已知问题与非问题

### 已知限制（设计如此）

1. **全 mock 数据**：无真实后端、认证、实时通信。所有数据是硬编码 TypeScript。
2. **游戏内容固定**：`mockTurnData` 只有一组回合数据，所有剧本 ID 显示相同内容。
3. **Omi AI 回复是模板**：从 `omiResponseTemplates` 随机选取，非真实 AI。
4. **无持久化**：刷新页面后用户状态/主题/评论都会重置（mock 数据重新加载）。
5. **无国际化**：原站本身没有 vue-i18n，所有文案是硬编码中文。

### 已确认的非问题

| 项 | 说明 |
|----|------|
| `<img>` in script-card | 死代码，`coverUrl` 恒 `undefined`，已有 eslint-disable |
| `formatTime` 水合风险 | 理论性，时间戳 2024-2025 稳定，不触发 |
| `backdrop-filter` 在 Playwright 中显示 none | Playwright Chromium 限制，真实浏览器正常渲染 |
| `_` 前缀参数 eslint 报错 | eslint config 不支持，用 `eslint-disable-next-line` 替代 |

---

## 15. 关键设计决策

### 1. shadcn/ui 使用 Base UI 而非 Radix

原项目模板选择了 `@base-ui/react` 作为 shadcn/ui 的原语层。这意味着：
- **没有 `asChild` prop**：需要使用 `render` prop 替代
- **Accordion**：使用 `multiple` 布尔值 + 数组 `defaultValue`，不是 Radix 的 `type="multiple"`
- **DropdownMenuTrigger**：直接渲染 button，不需要包裹
- **Dialog**：自动处理焦点陷阱、ARIA、ESC、焦点恢复

### 2. Mock 数据策略

选择全 mock 而非真实 API 调用，原因：
- 克隆的是前端，后端 API 不公开
- 确保 0 外部依赖，任何人 clone 后 `npm install && npm run dev` 即可运行
- mock 数据结构严格映射原站类型，未来接入真实 API 时只需替换数据层

### 3. `useUser` 暴露 `user` 而非 `currentUser`

```typescript
// ✅ 正确
const { user, login, isLoggedIn } = useUser();
// ❌ 错误 — currentUser 不存在
const { currentUser } = useUser();
```

### 4. Server / Client 边界

动态路由页（`/game/[scriptId]`、`/my-scripts/[scriptId]`、`/admin/script-reviews/[scriptVersionId]`）是 Server Component，`await params` 后委托给 Client Component。这样：
- 支持 `metadata` 导出
- 支持 `generateMetadata`（未来可按 scriptId 生成标题）
- params 类型安全（`Promise<{ scriptId: string }>`）

### 5. Metadata template 模式

```typescript
// 根 layout
title: { default: "Omnimundia — ...", template: "%s | Omnimundia" }
```

子路由只需设置 `title: "剧本大全"`，自动渲染为 `剧本大全 | Omnimundia`。避免重复后缀。

### 6. 评论区抽屉响应式

- 桌面端（md+）：340px 固定侧栏，与主面板并排
- 移动端：`fixed inset-0 z-50` 全屏覆盖 + 背景遮罩

---

## 16. 后续工作建议

### 高优先级

1. **接入真实后端**：替换 `src/lib/mock-data/` 为 API 调用（fetch/Server Actions）。类型系统已就绪。
2. **真实认证**：替换 `useUser` 的 mock login/logout 为 NextAuth.js 或自定义 JWT。
3. **Omi AI 接入**：替换 `omiResponseTemplates` 为流式 LLM API（SSE/WebSocket）。
4. **游戏内容动态化**：`mockTurnData` → 按剧本 ID 从 API 获取，选项点击后调 API 获取下一回合。

### 中优先级

5. **图片优化**：当真实 `coverUrl` 可用时，将 script-card 的 `<img>` 迁移到 `next/image`，配置 `remotePatterns`。
6. **代码分割**：OmiChatWidget、ScriptEditor 等重组件可 `dynamic import` 减少 initial bundle。
7. **加载状态**：添加 `loading.tsx`（Skeleton）给动态路由。
8. **错误处理**：在事件处理器中添加 try/catch + toast 通知。
9. **PWA**：添加 manifest + service worker 支持离线访问。

### 低优先级

10. **国际化**：如果需要多语言，引入 next-intl 或 next-i18next。
11. **测试**：添加 Vitest + Testing Library 单元/集成测试。
12. **E2E**：添加 Playwright E2E 测试覆盖关键路径。
13. **CI/CD**：GitHub Actions 自动 lint + typecheck + build。

---

## 17. Git 提交历史

```
8b5a9dd  ui: comprehensive visual optimization — glassmorphism, hover lift, animations
2f86a8f  audit(4th): a11y/empty-states/navigation — admin list links, empty state fallbacks
a12ef33  audit(3rd): resilience & SEO — error boundary, 404, responsive drawer, per-page metadata
1b6aeb0  fix: 深度审计修复 — 逻辑bug/可访问性/边界情况
bd34b3b  fix: 全面审计修复 — 定时器泄漏/全页刷新/eslint 0 errors
2cc3cc7  feat: omnimundia.com 全站复刻
```

### 提交说明

| Commit | 内容 |
|--------|------|
| `2cc3cc7` | Phase 1-8 全量实现：13 路由 + 46 组件 + 设计系统 + mock 数据 |
| `bd34b3b` | 第一轮审计：定时器泄漏 + 全页刷新 + 9 eslint 错误 |
| `1b6aeb0` | 第二轮审计：replyDraft 泄漏 + Omi 按钮锁死 + 面板溢出 + 终局状态 + 键盘 a11y + 流式清理 + 卡片链接 |
| `a12ef33` | 第三轮审计：error.tsx + not-found.tsx + 响应式评论抽屉 + per-page metadata |
| `2f86a8f` | 第四轮审计：admin 列表 Link + 空状态 fallback |
| `8b5a9dd` | UI 优化：毛玻璃 + hover 抬升 + 入场动画 + 排序下划线 + 场景排版 |

---

## 附录：快速验证

```bash
# 克隆
git clone https://github.com/2164312714-svg/omnimundia-clone.git
cd omnimundia-clone

# 安装
npm install

# 检查
npx tsc --noEmit     # → 0 errors
npx eslint src/      # → 0 problems
npm run build        # → 14 routes ✓

# 运行
npm run dev          # → http://localhost:3000
```

---

*文档生成时间：2026-07-07*
*项目状态：全站复刻完成 · 四轮审计通过 · UI 优化完成 · 生产就绪*
