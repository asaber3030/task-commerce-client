import { LOGO_PATH } from "@/lib/constants";

import Image from "next/image";
import Link from "next/link";

type Props = {
  width?: number;
  height?: number;
  variant?: "light" | "dark";
  showText?: boolean;
  href?: string;
};
export const Logo = ({ href = "/", showText = true, width = 30, height = 30 }: Props) => {
  return (
    <Link href={href} className='flex gap-2 items-center transition-all hover:opacity-85'>
      <Image
        src={LOGO_PATH}
        alt="Abdulrahman Saber's Logo"
        width={width}
        height={height}
        className='mix-blend-multiply'
      />
    </Link>
  );
};
