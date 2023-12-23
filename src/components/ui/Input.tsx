import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const defaultStyles =
  "mb-4 rounded-lg bg-input text-foreground p-4 border-[1px] placeholder:text-opacity-80";

export function Input({ ...rest }: InputProps) {
  return <input className={`${defaultStyles} h-10`} {...rest} />;
}
export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={`${defaultStyles}`} {...rest} />;
}
