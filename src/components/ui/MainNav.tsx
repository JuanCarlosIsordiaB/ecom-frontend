import { CategoriesResponseSchema } from "@/schemas/schemas";
import Logo from "./Logo";
import Link from "next/link";


async function getCategories() {
  const res = await fetch(`${process.env.API_URL}/categories`, {
    cache: "no-store",
    });
  const categories = await res.json();
  const parsedCategories = CategoriesResponseSchema.parse(categories);
 // console.log("Categories fetched:", parsedCategories);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return parsedCategories;
}

export default async function MainNav() {
   const categoriesMenu =  await getCategories();
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center"> <Logo /></div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
            {
                 (categoriesMenu && categoriesMenu.length > 0) &&
                    categoriesMenu.map((category) => (
                        <Link  
                            key={category.id}
                            href={`/${category.id}`}
                            className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {category.name}
                        </Link>
                    )) 
            }
      </nav>
    </header>
  );
}
