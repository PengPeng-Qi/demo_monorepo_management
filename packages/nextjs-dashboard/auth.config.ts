import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    // 用户会被重定向到我们的登录页面，而不是 NextAuth.js 默认页面
    signIn: "/login",
  },
  // 防止用户在非登录模式下访问 dashboard 页面
  callbacks: {
    // 在请求完成之前调用
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
