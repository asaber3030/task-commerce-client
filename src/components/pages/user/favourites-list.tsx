"use client";

import { useProductsInIds } from "@/hooks/useProducts";
import { useAppSelector } from "@/store/hooks";

import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { ProductSkeleton } from "../products/skeleton";
import { ProductCard } from "../products/card";
import { Product } from "@prisma/client";

export const FavouritesList = () => {
  const favourites = useAppSelector((state) => state.favourites);
  const { products, isProductsLoading } = useProductsInIds(favourites);

  if (isProductsLoading) {
    return (
      <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (products?.length === 0) return <EmptyState title='No favourites' />;

  return (
    <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
      {products?.map((product: Product) => (
        <ProductCard key={product.id} product={product!} />
      ))}
    </div>
  );
};
