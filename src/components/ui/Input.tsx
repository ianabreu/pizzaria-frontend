import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const defaultStyles =
  "mb-4 rounded-lg bg-input text-foreground p-4 border-[1px] placeholder:text-opacity-80";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return <input className={`${defaultStyles} h-10`} {...rest} ref={ref} />;
  }
);

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={`${defaultStyles}`} {...rest} />;
}

Input.displayName = "Input";
