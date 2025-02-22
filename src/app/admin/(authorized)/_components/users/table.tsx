import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { User } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { DeleteModal } from "@/components/common/delete-modal";
import { deleteUserAction } from "@/server/users";
import { UpdateUserModal } from "./update-modal";
import { EmptyState } from "../empty-state";

type Props = {
  users: User[];
};

export const UsersTable = ({ users }: Props) => {
  if (users.length === 0) return <EmptyState />;

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
        {users.map((user) => (
          <TableRow key={`page-row-${user.id}`}>
            <TableCell className='font-medium'>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{diffForHuman(user.createdAt)}</TableCell>
            <TableCell>{diffForHuman(user.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateUserModal user={user} />
              <DeleteModal deletedId={user.id} forceAction={deleteUserAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
