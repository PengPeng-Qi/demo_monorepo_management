import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { lusitana } from "@/app/ui/fonts";
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import CardWrapper from "../../ui/dashboard/cards";
import LatestInvoices from "../../ui/dashboard/latest-invoices";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/*
          动态渲染：用户发起请求时，为每个用户生成内容
            1. 数据可以是实时的
            2. 用户特定的内容，个性化配置等，可以根据用户交互更新数据
            3. 允许访问只在请求时才知道的信息，例如 Cookie、URL 参数等

          在渲染的过程中，如果发现页面有动态函数或者没有缓存的数据请求，Next.js 就会切换为动态渲染整个路由

          流：Suspence（单个组件） 和 loading.tsx（整个路由） 都可以开启流模式，将页面分为多个 chunk、分片进行加载，互相之间不影响

          在使用 Suspence 时，建议将数据获取移到需要的组件内
        */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
