"use client";
import { UploadButton } from "@uploadthing/react";
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
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <UploadButton
      endpoint="image"
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
