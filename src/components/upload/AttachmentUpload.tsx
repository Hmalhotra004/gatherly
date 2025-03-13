"use client";
import { UploadButton } from "@/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface AttachmentUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const AttachmentUpload = ({ onChange, value }: AttachmentUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-60 w-60">
        <Image
          src={value}
          alt="upload"
          fill
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-3 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadButton
      endpoint="attchment"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};

export default AttachmentUpload;
