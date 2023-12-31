import { Icons } from "../../constants/Icons";
import { ButtonHTMLAttributes, ReactNode } from "react";

const defaultStyles = `w-full p-[0.4rem] rounded-lg transition-all duration-200 font-bold`;
const hoverStyles = `hover:filter hover:brightness-110 `;
const colorStyles = {
  primary: `bg-primary text-foreground`,
  secondary: `bg-secondary text-background`,
  cancel: `bg-transparent text-cancel `,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
  size?: "default" | "large";
  variant?: keyof typeof colorStyles;
}

export function UIButton({
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
      } ${
        size === "large" ? "h-10 text-lg" : ""
      } flex items-center justify-center`}
      {...rest}
    >
      {loading ? (
        <span className="animate-spin m-auto">{Icons["loading"]}</span>
      ) : (
        children
      )}
    </button>
  );
}
