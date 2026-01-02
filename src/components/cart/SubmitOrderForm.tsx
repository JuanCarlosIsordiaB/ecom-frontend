import { SubmitOrder } from "@/actions/submit-order-action";
import { useStore } from "@/store";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function SubmitOrderForm() {
  const total = useStore((state) => state.total);
  const coupon = useStore((state) => state.coupon.name);
  const contents = useStore((state) => state.contents);
  const clearOrder = useStore((state) => state.clearOrder);
  const order = {
    total,
    coupon,
    contents,
  };

  const submitOrderWithData = SubmitOrder.bind(null, order);
  const [state, dispatch] = useActionState(submitOrderWithData, {
    error: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      clearOrder();
    }
    if (state.error.length) {
      toast.error(`Error al enviar la orden: ${state.error.join(", ")}`);
    }
  }, [state]);

  return (
    <form action={dispatch}>
      <input
        type="submit"
        className="mt-5 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
        value="Vuelve a confirmar"
      />
    </form>
  );
}
