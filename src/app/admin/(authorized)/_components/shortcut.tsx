"use client";

import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShortcutCardProps {
  title: string;
  description: string;
  url: string;
}

export function ShortcutCard({ title, description, url }: ShortcutCardProps) {
  const { push } = useRouter();
  return (
    <Link href={url}>
      <Card className='hover:bg-accent transition-colors cursor-pointer' onClick={() => push(url)}>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>{title}</CardTitle>
          <LinkIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
