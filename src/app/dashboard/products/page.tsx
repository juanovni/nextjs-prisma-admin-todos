'use client';

import { products } from "@/products/data/products";
import { ProductCard } from "@/products";

export default function ProductsPage() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}