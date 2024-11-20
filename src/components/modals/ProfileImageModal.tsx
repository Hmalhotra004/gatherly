"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Button from "../Button";
import FileUpload from "../FileUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

interface ProfileImageModalProps {
  children: React.ReactNode;
}

const formSchema = z.object({
  imageUrl: z.string(),
});

const ProfileImageModal = ({ children }: ProfileImageModalProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/settings`, values);
      if (response.status === 200) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogTitle>
          <DialogHeader>Edit Profile Image</DialogHeader>
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center">
                  <FormControl>
                    <FileUpload
                      endpoint="image"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              className="mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                fullWidth
                disabled={isLoading}
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageModal;
