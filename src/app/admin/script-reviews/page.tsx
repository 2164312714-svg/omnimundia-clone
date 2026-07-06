import { ShieldCheck } from "lucide-react";
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
  return (
    <div className="mx-auto w-full" style={{ maxWidth: "1200px", padding: "1.5rem 1rem" }}>
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-app-theme" />
        <h1 className="text-xl font-semibold text-app-text-l1">剧本审核</h1>
      </div>

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
              <TableRow key={review.id}>
                <TableCell className="font-medium text-app-text-l1">{review.scriptTitle}</TableCell>
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
    </div>
  );
}
