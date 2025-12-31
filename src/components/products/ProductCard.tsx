import { Product } from "@/schemas/schemas";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";



export default function ProductCard({ product }: { product: Product }) {

    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/${product.image}`}
                    width={400}
                    height={300}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                    priority
                />
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    <p className="text-gray-500">Disponibles:{product.inventory}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                </div>
            </div>
            <AddProductButton product={product} />
        </div>
    )
}