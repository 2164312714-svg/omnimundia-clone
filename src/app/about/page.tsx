import { Sparkles, Heart, PenSquare, Bot } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export default function AboutPage() {
  return (
    <div className="app-mobile-bottom-safe-area mx-auto w-full" style={{ maxWidth: "800px", padding: "2rem 1rem" }}>
      {/* Hero */}
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-5">
          <Logo variant="dark" />
        </div>
        <h1
          className="m-0 text-app-text-l1"
          style={{ fontSize: "2.2rem", fontWeight: 700 }}
        >
          无限可能的 AI 互动阅读平台
        </h1>
        <p className="mt-3 text-app-text-l3" style={{ fontSize: "0.98rem" }}>
          超高自由度的推演
        </p>
      </div>

      {/* 特性区块 */}
      <section
        className="mb-6 rounded-lg border p-6"
        style={{
          backgroundColor: "var(--app-bg-l2)",
          borderColor: "var(--app-border-l1)",
        }}
      >
        <h2 className="mb-4 text-app-text-l1" style={{ fontSize: "1.4rem", fontWeight: 600 }}>
          关于 Omnimundia
        </h2>
        <p className="leading-relaxed text-app-text-l3">
          Omnimundia 是一个 AI 驱动的互动阅读与创作平台。在这里，每一个剧本都不是固定的选项树，
          而是一个由 AI 实时推演的活的世界。你的每一个选择、每一次行动，都会被世界记住，
          并影响后续的走向。没有「正确答案」，只有你的故事。
        </p>
      </section>

      {/* 核心特性 */}
      <section
        className="mb-6 rounded-lg border p-6"
        style={{
          backgroundColor: "var(--app-bg-l2)",
          borderColor: "var(--app-border-l1)",
        }}
      >
        <h2 className="mb-4 text-app-text-l1" style={{ fontSize: "1.4rem", fontWeight: 600 }}>
          核心特性
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FeatureCard
            icon={Bot}
            title="AI 实时推演"
            description="基于剧本设定与你的行动，AI 实时生成后续场景、事件与 NPC 反应。超高自由度。"
          />
          <FeatureCard
            icon={Sparkles}
            title="剧本创作"
            description="使用世界树编辑器构建实体、属性、词条、状态与事件。支持多版本管理与审核流程。"
          />
          <FeatureCard
            icon={PenSquare}
            title="游玩助手 Omi"
            description="专属 AI 助手陪伴你的每一次推演。设定校对、规则澄清、局势分析，随时召唤。"
          />
          <FeatureCard
            icon={Heart}
            title="社区互动"
            description="剧本评论、点赞、分享你的游戏瞬间。与作者和其他玩家交流体验。"
          />
        </div>
      </section>

      {/* 如何参与 */}
      <section
        className="mb-6 rounded-lg border p-6"
        style={{
          backgroundColor: "var(--app-bg-l2)",
          borderColor: "var(--app-border-l1)",
        }}
      >
        <h2 className="mb-4 text-app-text-l1" style={{ fontSize: "1.4rem", fontWeight: 600 }}>
          如何参与
        </h2>
        <ol className="space-y-3 pl-0" style={{ listStyle: "none" }}>
          <StepItem
            num={1}
            title="浏览剧本"
            description="在剧本大全中找到你感兴趣的故事。支持按分类、热门、新作浏览。"
          />
          <StepItem
            num={2}
            title="开始推演"
            description="点击剧本卡片进入游玩页。AI 将根据你的选择实时推进剧情。"
          />
          <StepItem
            num={3}
            title="召唤 Omi"
            description="遇到困惑时，唤出游玩助手 Omi。它可以帮你分析局势、梳理线索。"
          />
          <StepItem
            num={4}
            title="创作剧本"
            description={'灵感来了？在「我的剧本」中新建剧本，用世界树编辑器构建你的世界。'}
          />
        </ol>
      </section>

      {/* 联系 */}
      <section
        className="rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "var(--app-bg-l2)",
          borderColor: "var(--app-border-l1)",
        }}
      >
        <p className="text-app-text-l4">
          Omnimundia · 无限可能
        </p>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bot;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        backgroundColor: "var(--app-bg-card)",
        borderColor: "var(--app-border-l1)",
      }}
    >
      <div
        className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "var(--app-color-theme-fade)",
          color: "var(--app-color-theme)",
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mb-1 text-app-text-l1" style={{ fontSize: "1rem", fontWeight: 600 }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-app-text-l3">{description}</p>
    </div>
  );
}

function StepItem({ num, title, description }: { num: number; title: string; description: string }) {
  return (
    <li className="flex gap-3">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-app-secondary"
        style={{ backgroundColor: "var(--app-color-theme)" }}
      >
        {num}
      </span>
      <div>
        <h3 className="text-app-text-l1" style={{ fontSize: "1rem", fontWeight: 600 }}>{title}</h3>
        <p className="mt-0.5 text-sm text-app-text-l3">{description}</p>
      </div>
    </li>
  );
}
