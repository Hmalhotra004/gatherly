import { ControllerFieldState, FieldValues } from "react-hook-form";
import { FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";

interface AuthLabelProps {
  id: string;
  children: React.ReactNode;
  field: FieldValues;
  fieldState: ControllerFieldState;
}

const AuthLabel = ({ id, children, field,fieldState }: AuthLabelProps) => {
  return (
    <FormLabel
      htmlFor={id}
      className={cn(
        "block text-sm font-medium leading-6 text-gray-900",
        fieldState?.error && "text-red-900"
      )}
      {...field}
    >
      {children}
    </FormLabel>
  );
};

export default AuthLabel;
