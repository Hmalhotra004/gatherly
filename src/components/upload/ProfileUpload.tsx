"use client";
import { UploadButton } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";

interface ProfileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

const ProfileUpload = ({ onChange, value }: ProfileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="upload"
          fill
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
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

export default ProfileUpload;
