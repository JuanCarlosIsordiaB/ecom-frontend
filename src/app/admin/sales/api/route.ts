import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  
  const searchParams = request.nextUrl.searchParams;
  const transactionDate = searchParams.get("transactionDate");

  const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`;
  const req = await fetch(url);

  if (!req.ok) {
    return new Response("Failed to fetch sales data", { status: req.status });
  }

  const res = await req.json();
  console.log("Sales API response:", res);
  return Response.json(res);
}
