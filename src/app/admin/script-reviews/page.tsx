import Link from "next/link";
import { ShieldCheck, Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockReviews } from "@/lib/mock-data";

export default function AdminScriptReviewListPage() {
  const hasReviews = mockReviews.length > 0;

  return (
    <div className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}>
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-app-theme" />
        <h1 className="text-xl font-semibold text-app-text-l1">剧本审核</h1>
      </div>

      {hasReviews ? (
        <div
          className="overflow-hidden rounded-lg border"
          style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l1)" }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: "var(--app-bg-l3)" }}>
                <TableHead className="text-app-text-l3">剧本名称</TableHead>
                <TableHead className="text-app-text-l3">作者</TableHead>
                <TableHead className="text-app-text-l3">版本</TableHead>
                <TableHead className="text-app-text-l3">提交时间</TableHead>
                <TableHead className="text-app-text-l3">状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReviews.map((review) => (
                <TableRow key={review.id} className="cursor-pointer transition-colors hover:bg-app-bg-l4">
                  <TableCell className="font-medium text-app-text-l1">
                    <Link
                      href={`/admin/script-reviews/${review.scriptVersionId}`}
                      className="text-app-theme hover:underline"
                    >
                      {review.scriptTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="text-app-text-l3">{review.author}</TableCell>
                  <TableCell className="text-app-text-l3">{review.versionName}</TableCell>
                  <TableCell className="text-app-text-l4">
                    {new Date(review.submittedAt).toLocaleDateString("zh-CN")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-app-theme-fade text-app-theme">
                      待审核
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-20 text-center"
          style={{
            backgroundColor: "var(--app-bg-l2)",
            borderColor: "var(--app-border-l1)",
          }}
        >
          <Inbox className="h-12 w-12 text-app-text-l6" />
          <p className="mt-4 text-app-text-l4">暂无待审核剧本</p>
        </div>
      )}
    </div>
  );
}
