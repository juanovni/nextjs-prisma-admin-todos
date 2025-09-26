// prc - comando para crear pages
import { Metadata } from "next";
import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata: Metadata = {
  title: 'Cookies Page',
  description: 'SEO TODOS'
}

export default async function CookiesPage() {

  const cookieStore = await cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

  return (
    <div>
      <h1>CookiesPage</h1>
      <TabBar currentTab={+cookieTab} />
    </div>
  );
}