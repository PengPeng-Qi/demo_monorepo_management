/**
 * 因为组件中有使用 usePathname 这个 hook，所以需要 use client
 */
"use client";

import { DocumentDuplicateIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
/**
 * Link 会自动通过文件路由进行代码分割和预请求
 *
 * 预请求(prefetch)：当 Link 出现在页面上的时候，Next.js 会自动进行预取链接对应路由的代码。
 * 当点击的时候，代码已经在后台加载好了。
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
