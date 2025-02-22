import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Admin, Page } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { FullPage } from "@/types/app";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { DeleteModal } from "@/components/common/delete-modal";
import { deleteAdminAction } from "@/server/admins";
import { UpdateAdminModal } from "./update-modal";

type Props = {
  admins: Admin[];
};

export const AdminsTable = ({ admins }: Props) => {
  if (admins.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={`page-row-${admin.id}`}>
            <TableCell className='font-medium'>{admin.id}</TableCell>
            <TableCell>{admin.name}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{diffForHuman(admin.createdAt)}</TableCell>
            <TableCell>{diffForHuman(admin.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateAdminModal admin={admin} />
              <DeleteModal deletedId={admin.id} forceAction={deleteAdminAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
