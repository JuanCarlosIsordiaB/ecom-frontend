



export async function getSalesByDate(date:string){
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
    const req = await fetch(url);
    const res = await req.json();
    if (!res.ok) {
        throw new Error("Failed to fetch sales data");
    }
    return res;
}