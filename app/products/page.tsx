"use client"

import CartInfo from '@/components/CartInfo';
import ProductList from '@/components/ProductList';
import React from 'react'

const Products = () => {
  return (
    <div className="flex h-screen">
    <div className="basis-2/3 py-4 px-8 overflow-y-auto">
      <ProductList />
    </div>
    <div className="basis-1/3 p-4">
      <CartInfo />
    </div>
  </div>

  )
}

export default Products;