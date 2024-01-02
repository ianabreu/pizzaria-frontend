import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <main
      className={`flex max-w-screen-md my-16 mx-auto flex-col px-4 justify-between`}
    >
      {children}
    </main>
  );
}