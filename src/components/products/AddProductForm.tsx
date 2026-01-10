"use client";

import ProductForm from "./ProductForm";

export default function AddProductForm({children}: {children?: React.ReactNode}) {
  return (
    <form className="space-y-5">
        {
            children
        }

       
        <input type="submit" value="Añadir Producto" className='bg-green-400 mt-5 px-2 py-3 w-full rounded-md hover:bg-green-500 transition-colors cursor-pointer' />
    </form>
  )
}
