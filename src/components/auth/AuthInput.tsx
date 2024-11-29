import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ControllerFieldState } from "react-hook-form";

interface AuthInputProps {
  id?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: any;
  disabled?: boolean;
  fieldState?: ControllerFieldState;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const AuthInput = ({
  id,
  type,
  field,
  disabled,
  fieldState,
  placeholder,
  value,
  onChange,
  autoComplete,
}: AuthInputProps) => {
  return (
    <Input
      className={cn(
        `form-input block w-full border-0 py-1.5 text-gray-900 shadow-sm 
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 
        focus-visible:ring-inset focus-visible:ring-sky-600 sm:text-sm sm:leading-6 focus-visible:ring-offset-0`,
        disabled && "opacity-50 cursor-default",
        fieldState?.error && "focus-visible:ring-red-900"
      )}
      id={id}
      type={type}
      autoComplete={autoComplete ?? "off"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...field}
    />
  );
};

export default AuthInput;
