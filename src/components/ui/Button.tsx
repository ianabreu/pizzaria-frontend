import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  size?: "default" | "large";
  variant?: "primary" | "cancel";
}
import { FaSpinner } from "react-icons/fa";

const defaultStyles = `max-w-screen-sm w-full p-[0.4rem] rounded-lg transition-all duration-200`;
const hoverStyles = `hover:filter hover:brightness-110 `;
const colorStyles = {
  primary: `bg-primary text-foreground`,
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
      <a>
        {loading ? <FaSpinner className="animate-spin m-auto" /> : children}
      </a>
    </button>
  );
}
