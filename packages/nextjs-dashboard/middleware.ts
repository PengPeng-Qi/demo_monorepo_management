/**
 * 使用中间件的优势是在中间件验证身份验证之前，受保护的路由甚至不会开始渲染，从而增强应用程序的安全性和性能。
 */
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // 指定了应该在特定的路径上运行
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
