import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControllerFieldState, FieldValues } from "react-hook-form";

interface AuthLabelProps {
  id: string;
  children: React.ReactNode;
  field: FieldValues;
  fieldState: ControllerFieldState;
}

const AuthLabel = ({ id, children, field, fieldState }: AuthLabelProps) => {
  return (
    <FormLabel
      htmlFor={id}
      className={cn(
        "block text-sm lg:text-base font-medium leading-6 text-gray-900",
        fieldState?.error && "text-red-900"
      )}
      {...field}
    >
      {children}
    </FormLabel>
  );
};

export default AuthLabel;
