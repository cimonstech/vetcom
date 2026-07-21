import { FileText, FileCheck, FilePen, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { getPostCounts } from "@/lib/supabase/adminQueries";

export default async function AdminDashboardPage() {
  const counts = await getPostCounts();

  const stats = [
    { label: "Total Posts", value: counts.total, icon: FileText },
    { label: "Published", value: counts.published, icon: FileCheck },
    { label: "Drafts", value: counts.draft, icon: FilePen },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of your blog content.</p>
        </div>
        <Button href="/admin/posts/new" variant="primary">
          <Plus className="mr-1.5 size-4" />
          New Post
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-lg bg-navy/5 text-navy">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-navy">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/admin/posts" className="font-semibold text-navy hover:text-gold">
          Manage all posts →
        </Link>
      </div>
    </div>
  );
}
