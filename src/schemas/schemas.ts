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