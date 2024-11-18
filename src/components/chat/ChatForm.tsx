"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const ChatForm = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post(`/api/messages`, {
      ...data,
      conversationId,
    });
  };

  function handleUpload(result: CloudinaryUploadWidgetResults) {
    axios.post(`/api/messages`, {
      image: result,
      conversationId,
    });
  }

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(r) => handleUpload(r)}
        uploadPreset="xv8cpb4y"
      >
        <HiPhoto
          size={30}
          className="text-sky-500"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="write a message"
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
    </div>
  );
};

export default ChatForm;
