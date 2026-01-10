import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import Link from 'next/dist/client/link'
import Head from 'next/head'
import React from 'react'

export default function NewProductPage() {
  return (
    <div className=''>
        <Link href="/admin/products" className="bg-green-400 px-2 py-3 rounded-md hover:bg-green-500 transition-colors" >Regresar a Productos</Link>
        <Heading>Nuevo Producto</Heading>

        <AddProductForm>
            <ProductForm />
        </AddProductForm>

    </div>
  )
}
