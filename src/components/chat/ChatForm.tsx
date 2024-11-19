"use client";

import EmojiPicker from "@/components/EmojiPicker";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/useConversation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { z } from "zod";
import ImageUploadModal from "../modals/ImageUploadModal";

const formSchema = z.object({
  message: z.string().min(1),
});

const ChatForm = () => {
  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.setValue("message", "", { shouldValidate: true });

    axios.post(`/api/messages`, {
      ...values,
      conversationId,
    });
  }

  function handleUpload(result: CloudinaryUploadWidgetResults) {
    try {
      axios.post(`/api/messages`, {
        image: result,
        conversationId,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  }

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <ImageUploadModal>
        <HiPhoto
          size={30}
          className="text-sky-500 cursor-pointer"
        />
      </ImageUploadModal>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="py-2 px-4 bg-neutral-100 w-full rounded-full flex items-center">
                <FormControl>
                  <div className="flex items-center w-full">
                    <Input
                      {...field}
                      placeholder="write a message"
                      className="text-black font-light focus:outline-none w-full bg-transparent p-0 mr-1 focus-visible:ring-0 border-0 focus-visible:border-0 focus-visible:ring-offset-0"
                      autoComplete="off"
                    />
                    <div>
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value}${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          >
            <HiPaperAirplane
              size={18}
              className="text-white"
            />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
