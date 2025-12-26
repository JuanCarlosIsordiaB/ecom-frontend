"use client";

import { useStore } from "@/store";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  console.log("Shopping cart contents:", contents);
  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900 ">Resumen de Venta</h2>

      <div>
        <h3>Total ${total}</h3>


        <div>
          <ul role="list" className="text-sm mt-6 divide-y divide-gray-200 border-t border-gray-200 font-bold ">
            {
              contents.map((item) => (
                <ShoppingCartItem key={item.productId} item={item} />
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );
}
