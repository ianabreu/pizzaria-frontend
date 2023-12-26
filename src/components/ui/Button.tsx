import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  size?: "default" | "large";
}
import { FaSpinner } from "react-icons/fa";

const defaultStyles = `max-w-screen-sm bg-primary p-[0.4rem] rounded-lg transition-all duration-200`;
const hoverStyles = `hover:filter hover:brightness-110 `;

export function Button({
  loading,
  size = "default",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={`${defaultStyles} ${hoverStyles} ${
        loading && "cursor-not-allowed"
      } ${size === "large" ? "h-10 text-lg" : ""} `}
      {...rest}
    >
      <a className="text-foreground">
        {loading ? <FaSpinner className="animate-spin m-auto" /> : children}
      </a>
    </button>
  );
}
