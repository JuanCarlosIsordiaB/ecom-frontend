import ProductCard from "@/components/products/ProductCard";
import { CategoryWithProductsResponseSchema } from "@/schemas/schemas";
import { redirect } from "next/navigation";


type Params = Promise<{ categoryId: string }>;

async function getProductsByCategory(categoryId: string) {
  const res = await fetch(
    `${process.env.API_URL}/categories/${categoryId}?products=true`,
    { next: {
      tags: ['products-by-category']
    } }
  );
  const json = await res.json();
  if(!res.ok) {
    redirect('/1');
  }
  //console.log("Raw API response:", JSON.stringify(json, null, 2));
  const products = CategoryWithProductsResponseSchema.parse(json);
  //console.log("Produtos:", products);
  return products;
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getProductsByCategory(categoryId);

  return (
    <div>
      Category: {categoryId}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
      </div>
    </div>
  );
}
