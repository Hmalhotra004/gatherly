"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

const AddFriendBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] =
    useState("eg: Username#0000");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const hashIndex = value.indexOf("#");

    if (hashIndex !== -1) {
      const namePart = value.slice(0, hashIndex + 1);
      const numberPart = value.slice(hashIndex + 1).replace(/\D/g, "");

      setInputValue(namePart + numberPart.slice(0, 4));

      setDynamicPlaceholder("0000");
    } else {
      setDynamicPlaceholder("eg: Username#0000");
      setInputValue(value);
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-4 px-4 gap-x-2">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={dynamicPlaceholder}
        className={cn(
          `form-input block w-full border-0 py-1.5 text-gray-900 shadow-sm 
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 
        focus-visible:ring-inset focus-visible:ring-sky-600 sm:text-sm sm:leading-6 focus-visible:ring-offset-0`
          // disabled && "opacity-50 cursor-default",
          // fieldState?.error && "focus-visible:ring-red-900"
        )}
      />
      <Button variant="blue">Add</Button>
    </div>
  );
};

export default AddFriendBox;
