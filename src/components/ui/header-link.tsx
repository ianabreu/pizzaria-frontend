import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  href: string;
}
export function NavLink({ children, href }: Props) {
  return (
    <Link href={href} className="hover:text-primary transition-colors p-2">
      {children}
    </Link>
  );
}
