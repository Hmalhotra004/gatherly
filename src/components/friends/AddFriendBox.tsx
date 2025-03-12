"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const AddFriendBox = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const hashIndex = value.indexOf("#");

    if (hashIndex !== -1) {
      const namePart = value.slice(0, hashIndex + 1);
      const numberPart = value.slice(hashIndex + 1).replace(/\D/g, "");

      setInputValue(namePart + numberPart.slice(0, 4));
    } else {
      setInputValue(value);
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (!inputValue.includes("#")) {
      return toast.error("Provide a valid name and code");
    }

    const [name, code] = inputValue.split("#");

    if (!name.trim() || !code.trim()) {
      return toast.error("Provide a valid name and code");
    }

    if (code.length !== 4) {
      return toast.error("Code should have 4 numbers");
    }

    try {
      const response = await axios.post(`/api/friends`, {
        name,
        code,
      });
      if (response.status === 200) {
        toast.success("Friend request sent");
      }
      setInputValue("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(error.response.data);
        } else if (error.response?.status === 404) {
          toast.error(`User doesn't exist`);
        } else if (error.response?.status === 400) {
          toast.error(`Cannot add yourself as a friend`);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex items-center justify-center w-full lg:my-4 px-4 gap-x-2"
    >
      <Input
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e);
        }}
        placeholder="eg: Username#0000"
        className={cn(
          `form-input block w-full border-0 py-1.5 text-gray-900 shadow-sm 
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 
          focus-visible:ring-inset focus-visible:ring-sky-600 sm:text-sm sm:leading-6 focus-visible:ring-offset-0`
        )}
      />
      <Button
        variant="blue"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default AddFriendBox;
