"use client";
import { UploadButton } from "@/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

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
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
        toast.success("Upload Success");
      }}
      onUploadError={(error: Error) => {
        console.error(error);
        toast.error("Something went wrong");
      }}
      className="mt-6"
    />
  );
};

export default ProfileUpload;
