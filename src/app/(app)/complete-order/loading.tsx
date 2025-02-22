"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslate } from "@/hooks/use-translate";

export default function Loading() {
  const translate = useTranslate();

  return (
    <div className='py-8'>
      <header className='pb-2 border-b border-b-secondaryDark mb-4'>
        <h1 className='text-2xl font-bold'>{translate("completeOrder")}</h1>
      </header>

      <div className='grid grid-cols-8 gap-4'>
        <div className='xl:col-span-6 col-span-8 space-y-4'>
          <Skeleton className='h-4 w-3/4 mt-4' />
          <Skeleton className='h-[400px] w-full' />

          <Separator className='bg-gray-50' />

          <Skeleton className='h-4 w-3/4 mt-4' />
          <Skeleton className='h-[400px] w-full' />
        </div>

        <div className='xl:col-span-2 col-span-8 bg-white rounded-md shadow-sm p-2 space-y-4 h-fit'>
          <Skeleton className='h-4 w-3/4 mt-2' />
          <Separator className='bg-gray-50' />

          <div className='flex gap-2 items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-4 w-20' />
          </div>
          <Separator className='bg-gray-50' />
          <Skeleton className='h-8 w-full' />
        </div>
      </div>
    </div>
  );
}
