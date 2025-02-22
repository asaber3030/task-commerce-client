import { Skeleton } from "@/components/ui/skeleton";

export const FormSkeleton = () => {
  return (
    <div className='w-full max-w-lg space-y-8'>
      <div className='space-y-2'>
        <Skeleton className='h-6 w-1/2' />
        <Skeleton className='h-4 w-3/4' />
      </div>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='space-y-2'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-32 w-full' />
        </div>

        <div className='space-y-4'>
          <Skeleton className='h-4 w-36' />
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-24' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </div>
    </div>
  );
};
