import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: any;
  buttonClassName?: ClassValue;
  linkClassName?: ClassValue;
  icon?: LucideIcon;
};

export const LinkBtn = ({
  href,
  variant,
  icon,
  children,
  linkClassName,
  buttonClassName
}: Props) => {
  return (
    <Link href={href} className={cn(linkClassName)}>
      <Button
        icon={icon}
        variant={variant}
        className={cn("px-4 rounded-md font-semibold capitalize", buttonClassName)}
      >
        <div className='flex gap-2 items-center'>{children}</div>
      </Button>
    </Link>
  );
};
