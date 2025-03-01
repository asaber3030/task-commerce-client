import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Category } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { DeleteModal } from "@/components/common/delete-modal";
import { UpdateCategoryModal } from "./update-modal";
import { EmptyState } from "../empty-state";
import { deleteCategoryAction } from "@/server/categories";

type Props = {
  categories: Category[];
};

export const CategoriesTable = ({ categories }: Props) => {
  if (categories.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={`page-row-${category.id}`}>
            <TableCell className='font-medium'>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{diffForHuman(category.createdAt)}</TableCell>
            <TableCell>{diffForHuman(category.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateCategoryModal category={category} />
              <DeleteModal deletedId={category.id} forceAction={deleteCategoryAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
