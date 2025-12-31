


export async function POST(request: Request) {
    const coupon = await request.json();

    const url = `${process.env.API_URL}/coupons/apply-coupon`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon),
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}