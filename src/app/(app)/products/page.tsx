import { AddToCart } from "@/components/pages/products/add-to-cart";
import { AddToFavourites } from "@/components/pages/products/add-to-favourites";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { diffForHuman } from "@/lib/utils";
import { getCategories } from "@/server/categories";
import { getProducts } from "@/server/products";
import ProductsFilter from "./_filter";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";

type Props = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const products = await getProducts(sp.search, Number(sp.category));
  const categories = await getCategories();

  const minPrice = Math.min(...products.map((product) => parseFloat(product.price.toString())));
  const maxPrice = Math.max(...products.map((product) => parseFloat(product.price.toString())));

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Products</h1>
        <p className='text-muted-foreground'>Showing {products.length} products</p>
      </div>

      {/* Filters Section */}
      <ProductsFilter minPrice={minPrice} maxPrice={maxPrice} categories={categories} />

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Card key={product.id} className='flex flex-col'>
              {product.image && (
                <div className='relative aspect-video w-full overflow-hidden rounded-t-lg'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='object-cover w-full h-full'
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle className='text-xl'>{product.name}</CardTitle>
                <CardDescription className='text-sm text-muted-foreground'>
                  Added {diffForHuman(product.createdAt)}
                </CardDescription>
              </CardHeader>

              <CardContent className='flex-grow'>
                {product.description && (
                  <p className='text-muted-foreground line-clamp-2'>{product.description}</p>
                )}
              </CardContent>

              <CardFooter className='flex justify-between items-center'>
                <span className='text-lg font-semibold'>{product.price} EGP</span>
                <div className='flex gap-2'>
                  <AddToCart item={product}>Add to cart</AddToCart>
                  <AddToFavourites itemId={product.id} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
