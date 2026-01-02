"use client";

import { useStore } from "@/store";
import ShoppingCartItem from "./ShoppingCartItem";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
import SubmitOrderForm from "./SubmitOrderForm";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);
  // console.log("Shopping cart contents:", contents);
  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900 ">Resumen de Venta</h2>

      <div>
        {contents.length === 0 ? (
          <p className="mt-4 text-gray-500">El carrito está vacío.</p>
        ) : (
          <>
            <h3>Total ${total}</h3>

            <div>
              <ul
                role="list"
                className="text-sm mt-6 divide-y divide-gray-200 border-t border-gray-200 font-bold "
              >
                {contents.map((item) => (
                  <ShoppingCartItem key={item.productId} item={item} />
                ))}
              </ul>
              <dl>
                {discount ? (
                  <Amount
                    label="Descuento"
                    amount={discount}
                    discount={true}
                  />
                ) : null}
                <Amount label="Total" amount={total} />
              </dl>
            </div>
            <CouponForm />
            <SubmitOrderForm />
          </>
        )}
      </div>
    </>
  );
}
