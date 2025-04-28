// import { getUsers } from "@/actions/admin/users.action";
// import { getBooks } from "@/actions/book.action";
import { StatCard } from "@/components/admin/StatCard";
import { User, BookOpen, BookMarked, Clock } from "lucide-react";
// import { getSession } from "next-auth/react";

export default async function AdminDashboard() {
  // Total books
  // const session = await getSession()
  // const users = await getUsers()
  // const userName = session?.user?.name;
  // const totalBooks = await getBooks(session?.user?.id || "");
  return (
    <div className="p-6 space-y-8">
      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Active Subscriptions"
          value={12}
          icon={<BookMarked className="size-6" />}
          description="+2% this month"
          variant="active"
          size="lg"
        />
        <StatCard
          title="Total Users"
          value={1034}
          // value={users.length}
          icon={<User className="size-6" />}
          description="+5% from last week"
          variant="total"
          size="lg"
        />
        <StatCard
          title="Overdue Books"
          value={24}
          icon={<Clock className="size-5" />}
          description="Action needed"
          variant="dues"
          size="lg"
        />
        
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Books"
          // value={totalBooks.length}
          value={205}
          icon={<BookOpen className="size-6" />}
          variant="total"
          size="md"
        />
        <StatCard
          title="Books Borrowed"
          value={1029}
          icon={<BookMarked className="size-5" />}
          description="Stable usage"
          variant="active"
          size="md"
        />
      </div>
    </div>
  );
}
