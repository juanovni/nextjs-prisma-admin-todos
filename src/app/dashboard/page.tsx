import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado S-Side">
        <div>{session.user?.name}</div>
        <div>{session.user?.email}</div>
        <div>{session.user?.image}</div>
        <div>{session.user?.roles?.join(',')}</div>
        <div>{session.user?.id}</div>
      </WidgetItem>
    </div>
  );
}