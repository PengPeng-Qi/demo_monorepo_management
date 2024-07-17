/**
 * [xxx] 会创建一个动态路由段
 */
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const id = params.id;
  // 获取发票信息和所有用户信息
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  // 如果不存在该 invoice，则导航到 not-found 页面
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
