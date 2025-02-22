import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Employee, User } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { DeleteModal } from "@/components/common/delete-modal";
import { deleteUserAction } from "@/server/users";
import { EmptyState } from "../empty-state";
import { UpdateEmployeeModal } from "./update-modal";
import { CreatePerformanceLogModal } from "./performance-log-modal";
import { CreateTaskModal } from "./task-modal";

type Props = {
  employees: Employee[];
};

export const EmployeesTable = ({ employees }: Props) => {
  if (employees.length === 0) return <EmptyState />;

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
        {employees.map((user) => (
          <TableRow key={`page-row-${user.id}`}>
            <TableCell className='font-medium'>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{diffForHuman(user.createdAt)}</TableCell>
            <TableCell>{diffForHuman(user.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateEmployeeModal employee={user} />
              <CreatePerformanceLogModal employeeId={user.id} />
              <CreateTaskModal employeeId={user.id} />
              <DeleteModal deletedId={user.id} forceAction={deleteUserAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
