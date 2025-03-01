import { deleteProductAction } from "@/server/products";
import { diffForHuman } from "@/lib/utils";

import { Category, Product } from "@prisma/client";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { DeleteModal } from "@/components/common/delete-modal";
import { UpdateProductModal } from "./update-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

type Props = {
  products: (Product & {
    category: Category;
  })[];
  categories: Category[];
};

export const ProductsTable = ({ products, categories }: Props) => {
  if (products.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={`page-row-${product.id}`}>
            <TableCell className='font-medium'>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price} EGP</TableCell>
            <TableCell>
              <img
                src={product.image ?? ""}
                alt='Image'
                className='rounded-md w-16 h-16 object-cover'
              />
            </TableCell>
            <TableHead>{product.category.name}</TableHead>
            <TableCell>{diffForHuman(product.createdAt)}</TableCell>
            <TableCell>{diffForHuman(product.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateProductModal categories={categories} product={product} />
              <DeleteModal deletedId={product.id} forceAction={deleteProductAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
