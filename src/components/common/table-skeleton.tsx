import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminNavbar } from "@/app/admin/(authorized)/_components/navbar/navbar";

export const TableSkeleton = () => {
  return (
    <div>
      <div className='max-w-screen-2xl py-10 mx-auto'>
        <div className='flex gap-2 items-center justify-between mb-4'>
          <Skeleton className='h-10 w-36' />
          <div className='flex gap-2'>
            <Skeleton className='h-10 w-20' />
            <Skeleton className='h-10 w-20' />
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-24'>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
                <TableHead>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
                <TableHead className='text-right'>
                  <Skeleton className='h-4 w-20' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-4 w-16' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-32' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-48' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-24' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Skeleton className='h-4 w-28 ml-auto' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
