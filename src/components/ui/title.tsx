import { ReactNode } from "react";

type TitleProps = {
  children?: ReactNode;
};
export function Title({ children }: TitleProps) {
  return <h1 className="font-bold text-xl">{children}</h1>;
}
