import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/schemas/schemas";
import { isValidPage } from "@/utils";
import { redirect } from "next/navigation";

async function getProducts(take: number = 10, skip: number = 0) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?take=${take}&skip=${skip}`;
  //console.log(url);
  const res = await fetch(url, { cache: "no-store" });
  //console.log(res);
  const json = await res.json();
  //console.log(json);
  const data = ProductsResponseSchema.parse(json);
  //console.log("data", data);
  return {
    products: data.data,
    total: data.total,
  };
}

type SearchParams = Promise<{ page: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  if (!isValidPage(Number(page))) {
    redirect("/admin/products?page=1");
  }
  const productsPerPage = 10;
  const skip = (Number(page) - 1) * productsPerPage;
  const products = await getProducts(productsPerPage, skip);

  const totalPages = Math.ceil(products.total / productsPerPage);
  if (Number(page) > totalPages && totalPages > 0) {
    redirect(`/admin/products?page=${totalPages}`);
  }
  return (
    <>
      <Heading>Products Managing</Heading>
      <ProductsTable products={products.products} total={products.total} />
      <Pagination currentPage={Number(page)} totalPages={totalPages} />
    </>
  );
}
