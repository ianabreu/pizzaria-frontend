import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <main
      className={`flex max-w-screen-md mx-auto flex-col px-4 justify-between`}
    >
      {children}
    </main>
  );
}
