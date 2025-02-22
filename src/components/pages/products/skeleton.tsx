import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className='bg-white p-2 space-y-2 rounded-md shadow-sm'>
      <Skeleton className='rounded-md w-full h-[250px]' />
      <div className='space-y-2'>
        <Skeleton className='w-full h-3' />
        <Skeleton className='w-20 h-3' />
        <Skeleton className='w-32 h-3' />
      </div>
      <div className='pb-2 px-0 pt-2 gap-2 border-t grid grid-cols-6'>
        <div className='col-span-5'>
          <Skeleton className='w-full h-8' />
        </div>
        <div className='col-span-1'>
          <Skeleton className='w-full h-8' />
        </div>
      </div>
    </div>
  );
};
