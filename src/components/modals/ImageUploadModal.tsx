"use client";

import useConversation from "@/hooks/useConversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
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

interface ImageUploadModalProps {
  children: React.ReactNode;
}

const formSchema = z.object({
  imageUrl: z.string(),
});

const ImageUploadModal = ({ children }: ImageUploadModalProps) => {
  const [open, setOpen] = useState(false);
  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`/api/messages`, {
        image: values.imageUrl,
        conversationId,
      });
      if (response.status == 200) {
        setOpen(false);
        form.setValue("imageUrl", "", { shouldValidate: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
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
          <DialogHeader>Upload an image</DialogHeader>
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
            <div className="mt-4">
              <Button fullWidth>Send</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;