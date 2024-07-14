/**
 * 自定义字体
 * 1. 在构建的时候就会下载字体，与静态资源一起托管，使用的时候不会再去谷歌下载
 * 2. 零 CLS（零布局偏移）
 *  */
import { inter } from "@/app/ui/fonts";
// 全局样式
import "./ui/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
