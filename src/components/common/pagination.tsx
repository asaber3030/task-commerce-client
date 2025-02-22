"use client";

import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { build } from "search-params";

export const DataPagination = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

  const allParams = (page: number) =>
    build({
      page,
      search: searchParams.get("search") || ""
    });

  return (
    <Pagination className='mx-auto'>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={`?${allParams(page - 1 === 0 ? 1 : page - 1)}`}
            className='flex gap-2 items-center p-2 rounded-md border px-4 hover:bg-gray-100 transition-all'
          >
            <ArrowLeft size={16} />
            Previous
          </Link>
        </PaginationItem>
        <PaginationItem>
          <Link
            href={`?${allParams(page + 1)}`}
            className='flex gap-2 items-center p-2 rounded-md border px-4 hover:bg-gray-100 transition-all'
          >
            Next
            <ArrowRight size={16} />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
