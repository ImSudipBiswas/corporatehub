"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  if (value) {
    return (
      <div className="relative h-16 w-16">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-red-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={"orgImage"}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => console.log(error)}
      appearance={{
        button: "bg-primary bg-opacity-90 after:bg-primary after:bg-opacity-100",
        container: "ut-uploading:pointer-events-none ut-uploading:cursor-not-allowed",
        label: "text-primary hover:text-primary",
      }}
    />
  );
};
