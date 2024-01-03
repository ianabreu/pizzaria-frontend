import { ButtonHTMLAttributes, ReactNode } from "react";
import { Icons } from "@/constants/Icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: ReactNode;
  size?: "default" | "large";
  variant?: keyof typeof colorStyles;
}

const defaultStyles = `w-full p-[0.4rem] rounded-lg transition-all duration-200 font-bold`;
const hoverStyles = `hover:filter hover:brightness-110 `;
const colorStyles = {
  primary: `bg-primary text-foreground`,
  secondary: `bg-secondary text-background`,
  cancel: `bg-transparent text-cancel `,
};

export function Button({
  loading = false,
  size = "default",
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={`${defaultStyles} ${colorStyles[variant]} ${hoverStyles} ${
        loading && "cursor-not-allowed"
      } ${size === "large" ? "h-10 text-lg" : ""} `}
      {...rest}
    >
      <a>{loading ? <span>{Icons["loading"]}</span> : children}</a>
    </button>
  );
}
