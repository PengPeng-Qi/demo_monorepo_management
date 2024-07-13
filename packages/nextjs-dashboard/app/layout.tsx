// 自定义字体
import { inter } from '@/app/ui/fonts';
// 全局样式
import './ui/global.css';

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
