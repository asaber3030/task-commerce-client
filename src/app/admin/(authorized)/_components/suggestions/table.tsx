import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Suggestion } from "@prisma/client";

import { diffForHuman } from "@/lib/utils";
import { DeleteModal } from "@/components/common/delete-modal";
import { EmptyState } from "../empty-state";
import { deleteSuggestionAction } from "@/server/suggestions";

type Props = {
  suggestions: Suggestion[];
};

export const SuggestionsTable = ({ suggestions }: Props) => {
  if (suggestions.length === 0) return <EmptyState />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>#</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suggestions.map((s) => (
          <TableRow key={`page-row-${s.id}`}>
            <TableCell className='font-medium'>{s.id}</TableCell>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.email}</TableCell>
            <TableCell>{s.message}</TableCell>
            <TableCell>{diffForHuman(s.createdAt)}</TableCell>
            <TableCell className='flex gap-2'>
              <DeleteModal deletedId={s.id} forceAction={deleteSuggestionAction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
