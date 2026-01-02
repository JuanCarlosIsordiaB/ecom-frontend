import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Coupon,
  CouponResponseSchema,
  Product,
  ShoppingCart,
} from "./schemas/schemas";

interface Store {
  total: number;
  discount?: number;
  contents: ShoppingCart;
  coupon: Coupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  calculateTotal: () => void;
  applyCoupon: (code: string) => Promise<void>;
  applyDiscount: (percentage: number) => void;
  clearOrder: () => void;
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  coupon: { name: "", message: "", percenatge: 0 },
};

export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,
    addToCart: (product: Product) => {
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCart = [];

      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );
      //  console.log("Duplicated index:", duplicated);
      if (duplicated >= 0) {
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].inventory
        ) {
          console.log("Cannot add more items, inventory limit reached.");
          return;
        }

        contents = get().contents.map((item, index) => {
          if (index === duplicated) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }

      set(() => ({
        contents,
      }));
      get().calculateTotal();
    },
    updateQuantity: (id, quantity) => {
      const contents = get().contents.map((item) => {
        if (item.productId === id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
      set(() => ({
        contents,
      }));

      get().calculateTotal();
    },
    removeFromCart: (id) => {
      const contents = get().contents.filter((item) => item.productId !== id);
      set(() => ({
        contents,
      }));
      if (!get().contents.length) {
        get().clearOrder();
        return;
      }
      get().calculateTotal();
    },
    calculateTotal: () => {
      const total = get().contents.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      if (get().coupon.percenatge > 0) {
        get().applyDiscount(get().coupon.percenatge);
        return;
      }

      set(() => ({
        total,
      }));
    },
    applyCoupon: async (code: string) => {
      try {
        const req = await fetch("/coupons/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coupon_name: code }),
        });
        const json = await req.json();
        const coupon = CouponResponseSchema.parse(json);
        console.log("desde el store", coupon);

        if (coupon.percenatge > 0) {
          get().applyDiscount(coupon.percenatge);
        }

        set(() => ({
          coupon,
        }));
      } catch (error) {
        console.error("Error applying coupon:", error);
      }
    },
    applyDiscount: (percentage: number) => {
      const currentTotal = get().total;
      const discountAmount = (currentTotal * percentage) / 100;
      const newTotal = currentTotal - discountAmount;
      set(() => ({
        discount: discountAmount,
        total: newTotal,
      }));
    },
    clearOrder: () => {
      set(() => ({
        ...initialState,
      }));
    },
  }))
);
