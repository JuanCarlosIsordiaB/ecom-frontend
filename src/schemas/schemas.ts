import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  inventory: z.number(),
  description: z.string().nullable(),
  categoryId: z.number().optional(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
});

export const CategoriesResponseSchema = z.array(CategorySchema);


export type Product = z.infer<typeof ProductSchema>;

/** Shopping Cart **/
const ShoppingCartCotentSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  inventory: true,
}).extend({
  productId: z.string(),
  quantity: z.number(),
})

export const ShoppingCartSchema = z.array(ShoppingCartCotentSchema);

export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartCotentSchema>;


export const CouponResponseSchema = z.object({
  name: z.string().default(""),
  message: z.string(),
  percenatge: z.coerce.number().min(0).max(100).default(0),
})

export type Coupon = z.infer<typeof CouponResponseSchema>;