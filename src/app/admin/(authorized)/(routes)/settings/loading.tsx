"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='grid xl:grid-cols-7 gap-10'>
      <div className='col-span-7 space-y-4'>
        <Skeleton className='h-4 w-64' />

        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10' />
        </div>
        <Skeleton className='h-10 w-24' />
      </div>
    </div>
  );
}
