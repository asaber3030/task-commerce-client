import { diffForHuman } from "@/lib/utils";

import { Partner, Review } from "@prisma/client";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { DeleteModal } from "@/components/common/delete-modal";
import { UpdatePartnerModal } from "./update-modal";

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
  partners: Partner[];
};

export const PartnersTable = ({ partners }: Props) => {
  if (partners.length === 0) return <EmptyState />;

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
        {partners.map((partner) => (
          <TableRow key={`page-row-${partner.id}`}>
            <TableCell className='font-medium'>{partner.id}</TableCell>
            <TableCell>{partner.name}</TableCell>
            <TableCell>
              <img src={partner.image || "/bg.webp"} alt='Image' className='rounded-md w-20 h-20' />
            </TableCell>
            <TableCell>{diffForHuman(partner.createdAt)}</TableCell>
            <TableCell>{diffForHuman(partner.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdatePartnerModal partner={partner} />
              <DeleteModal deletedId={partner.id} forceAction={deleteReviewAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
