import { diffForHuman } from "@/lib/utils";

import { Review } from "@prisma/client";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { DeleteModal } from "@/components/common/delete-modal";
import { UpdateReviewModal } from "./update-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { deleteReviewAction } from "@/server/reviews";

type Props = {
  reviews: Review[];
};

export const ReviewsTable = ({ reviews }: Props) => {
  if (reviews.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={`page-row-${review.id}`}>
            <TableCell className='font-medium'>{review.id}</TableCell>
            <TableCell>{review.name}</TableCell>
            <TableCell>
              <img src={review.image || "/bg.webp"} alt='Image' className='rounded-md w-20 h-20' />
            </TableCell>
            <TableCell>{diffForHuman(review.createdAt)}</TableCell>
            <TableCell>{diffForHuman(review.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateReviewModal review={review} />
              <DeleteModal deletedId={review.id} forceAction={deleteReviewAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
