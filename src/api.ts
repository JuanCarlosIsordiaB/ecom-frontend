import { TransactionsResponseSchema } from "./schemas/schemas";

export async function getSalesByDate(date: string) {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
  const req = await fetch(url);

  if (!req.ok) {
    throw new Error("Failed to fetch sales data");
  }

  const res = await req.json();
  const transactions = TransactionsResponseSchema.parse(res);
  console.log("Fetched transactions:", transactions);
  return transactions;
}
