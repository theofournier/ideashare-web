"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  href: string;
}>;

export const NavbarItem = ({ href, children }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: pathname === href ? "default" : "ghost",
      })}
    >
      {children}
    </Link>
  );
};
