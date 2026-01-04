import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;  
    const transactionDate = searchParams.get("transactionDate");

    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`;
    const req = await fetch(url);
    const res = await req.json();
    if (!res.ok) {
        return new Response("Failed to fetch sales data", { status: res.status });
    }
    return Response.json(res);
}