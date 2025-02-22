import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Blog, User } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { DeleteModal } from "@/components/common/delete-modal";
import { deleteUserAction } from "@/server/users";
import { UpdateBlogModal } from "./update-modal";
import { EmptyState } from "../empty-state";
import { deleteBlogAction } from "@/server/blogs";
import Image from "next/image";

type Props = {
  blogs: Blog[];
};

export const BlogsTable = ({ blogs }: Props) => {
  if (blogs.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Updated at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((blog) => (
          <TableRow key={`page-row-${blog.id}`}>
            <TableCell className='font-medium'>{blog.id}</TableCell>
            <TableCell>{blog.title}</TableCell>
            <TableCell>
              <Image
                src={blog.image}
                alt='Blog image'
                width={50}
                height={50}
                className='object-cover rounded-md'
              />
            </TableCell>
            <TableCell>{diffForHuman(blog.createdAt)}</TableCell>
            <TableCell>{diffForHuman(blog.updatedAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateBlogModal blog={blog} />
              <DeleteModal deletedId={blog.id} forceAction={deleteBlogAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
