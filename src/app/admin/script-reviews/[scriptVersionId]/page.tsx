import type { Metadata } from "next";
import { ReviewDetailContent } from "@/components/admin/review-detail-content";

export const metadata: Metadata = {
  title: "审核详情",
  description: "查看剧本版本详情并进行审核操作。",
};

export default async function AdminScriptReviewDetailPage({
  params,
}: {
  params: Promise<{ scriptVersionId: string }>;
}) {
  const { scriptVersionId } = await params;

  return <ReviewDetailContent scriptVersionId={scriptVersionId} />;
}
