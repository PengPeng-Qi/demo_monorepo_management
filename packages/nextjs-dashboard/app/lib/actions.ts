/**
 * 因为使用 use server
 * 该文件所有导出均被标记为了 React Server Actions
 *
 * React Server Actions 允许直接在服务器上运行异步代码
 * 可以不必创建接口来改变数据
 *
 * 可以在客户端和服务器组件中导入和使用这些服务器功能
 * */
"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// TS 的类型验证库，可以验证数据类型
import { z } from "zod";

// 定义与创建表单数据类型相匹配的架构，在保存到数据库之前对齐进行验证
const FormSchema = z.object({
  id: z.string(),
  // 如果客户字段为空，Zod 已经抛出错误，因为它需要类型 string 。
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  // 从字符串转换为数字，还验证了类型
  amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], { invalid_type_error: "Please select an invoice status." }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// 新增 invoice
export async function createInvoice(prevState: State, formData: FormData) {
  // export async function createInvoice(formData: FormData) {
  // 将 formData 传递给 CreateInvoice 验证类型，safeParse() 将返回一个包含 success 或 error 字段的对象。
  const validatedFields = CreateInvoice.safeParse({
    // 提取 formData 的值
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  // 将金额转换为美分存储在数据库，消除浮点数的错误以确保准确信
  const amountInCents = amount * 100;
  // 创建 YYYY-MM-DD 日期
  const date = new Date().toISOString().split("T")[0];

  // 将数据插入数据库
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  /**
   * Next.js 有客户端路由器缓存，可以将路由暂存在用户浏览器中
   *
   * 此缓存会在用户切换路由器的时候，减少对服务器发送请求
   *
   * 因为要更新发票路由中显示的数据，所以需要清理缓存并向服务器重新发起请求
   *
   * revalidatePath 就可以执行该操作
   */
  revalidatePath("/dashboard/invoices");
  // 重定向到 dashboard/invoices 页面
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
