"use server";

import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/schemas/schemas";
import { revalidateTag, updateTag } from "next/cache";



export async function SubmitOrder(data: unknown) {
  const order = OrderSchema.parse(data);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...order }),
  });
  const json = await response.json();
  if (!response.ok) {
    const errors = ErrorResponseSchema.parse(json);
    const errorMessages = Array.isArray(errors.message)
      ? errors.message
      : [errors.message];
    return { error: errorMessages || ["Failed to submit order"], success: "" };
  }

  const success = SuccessResponseSchema.parse(json);
  
  updateTag('shopping-cart');
  

  return { success: success.message, error: [] };
}
