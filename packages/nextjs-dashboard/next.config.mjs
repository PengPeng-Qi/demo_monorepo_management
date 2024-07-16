/** @type {import('next').NextConfig} */

const nextConfig = {
  /**
   * 给项目开启部分预渲染 Partial Prerender（一部分静态组件一部分动态组件加载
   *
   * 先进行静态加载，推迟动态组件的加载
   */
  experimental: {
    ppr: "incremental", // 允许对特定的路由开启预渲染
  },
};

export default nextConfig;
