import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const defaultStyles =
  "mb-4 rounded-md bg-input text-foreground border-[1px] placeholder:text-opacity-80";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return (
      <input className={`${defaultStyles} p-4 h-10`} {...rest} ref={ref} />
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...rest }, ref) => {
    return (
      <textarea
        className={`${defaultStyles} py-2 px-4 h-28 resize-none`}
        {...rest}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
TextArea.displayName = "TextArea";
