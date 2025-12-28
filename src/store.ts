import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, ShoppingCart } from "./schemas/schemas";

interface Store {
  total: number;
  contents: ShoppingCart;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  calculateTotal: () => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product: Product) => {
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCart = [];

      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );
      console.log("Duplicated index:", duplicated);
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

      get().calculateTotal();
    },
    calculateTotal: () => {
      const total = get().contents.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      set(() => ({
        total,
      }));


    },
  }))
);
