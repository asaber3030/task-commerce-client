import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { diffForHuman } from "@/lib/utils";
import { AddToCart } from "./add-to-cart";
import { AddToFavourites } from "./add-to-favourites";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Card key={product.id} className='flex flex-col'>
      {product.image && (
        <div className='relative aspect-video w-full overflow-hidden rounded-t-lg'>
          <img src={product.image} alt={product.name} className='object-cover w-full h-full' />
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
  );
};
