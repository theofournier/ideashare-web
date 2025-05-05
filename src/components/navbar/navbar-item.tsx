import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ElementType } from "react";

type Props = {
  href: string;
  currentPathname: string;
  text: string;
  Icon: ElementType;
};

export const NavbarItem = ({ href, currentPathname, text, Icon }: Props) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: currentPathname === href ? "default" : "ghost",
      })}
    >
      <Icon />
      {text}
    </Link>
  );
};
