import { ReviewDetailContent } from "@/components/admin/review-detail-content";

export default async function AdminScriptReviewDetailPage({
  params,
}: {
  params: Promise<{ scriptVersionId: string }>;
}) {
  const { scriptVersionId } = await params;

  return <ReviewDetailContent scriptVersionId={scriptVersionId} />;
}
