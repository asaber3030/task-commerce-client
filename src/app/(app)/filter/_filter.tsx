"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Category, Product, ProductSale } from "@prisma/client";
import { InputField } from "@/components/common/input";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { findProductsBasedOnQuestions } from "@/server/app";
import { LoadingButton } from "@/components/common/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AddToCart } from "@/components/pages/products/add-to-cart";
import { AddToFavourites } from "@/components/pages/products/add-to-favourites";
import { diffForHuman } from "@/lib/utils";

type Props = {
  categories: Category[];
};

export const QuestionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.number().optional(),
  price: z.number().optional()
});

export default function FindProducts({ categories }: Props) {
  const [data, setData] = useState<Product[] | undefined>();

  const form = useForm({
    resolver: zodResolver(QuestionSchema)
  });

  const mutation = useMutation({
    mutationFn: (d: z.infer<typeof QuestionSchema>) => findProductsBasedOnQuestions(d),
    onSuccess: (data) => {
      setData(data);
    }
  });

  const onSubmit = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <div className=''>
      {!data ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <InputField label='Name' placeholder='Name' name='name' control={form.control} />
            <InputField
              label='Description'
              placeholder='Description'
              name='description'
              control={form.control}
            />
            <InputField label='Price' placeholder='Price' name='price' control={form.control} />
            <SelectField label='Category' name='category' control={form.control} valueAsNumber>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectField>

            <LoadingButton loading={mutation.isPending}>Search</LoadingButton>
          </form>
        </Form>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
          {data.map((product) => (
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
