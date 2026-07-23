import { forwardRef } from "react";
import BaseInput from "./BaseInput";

type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: "text" | "email" | "url" | "tel" | "search";
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", ...rest }, ref) => (
    <BaseInput ref={ref} type={type} {...rest} />
  )
);

TextInput.displayName = "TextInput";

export default TextInput;
