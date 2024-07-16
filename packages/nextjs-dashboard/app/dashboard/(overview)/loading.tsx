/**
 * 流组件：放置在（overview）文件夹下仅会作用与 /dashboard 路由
 *
 * overview 可以是任何值
 */
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
