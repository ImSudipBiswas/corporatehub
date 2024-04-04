"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

export const ImageUpload = ({ onChange, label, value, disabled }: ImageUploadProps) => {
  const [base64, setBase64] = useState<string>(value!);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const handleRemove = useCallback(
    (e: any) => {
      e.stopPropagation();
      setBase64("");
      handleChange("");
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/svg": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: cn(
          "relative border border-zinc-200 cursor-pointer h-16",
          disabled && "pointer-events-none opacity-70",
          base64 ? "w-16 rounded-full" : "w-full rounded-md border-dotted"
        ),
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <>
          <button className="absolute -top-1 right-0 z-[2] bg-primary text-background p-1 rounded-full">
            <X className="h-3 w-3" onClick={(e) => handleRemove(e)} />
          </button>
          <Image src={base64} fill alt="Selected file" className="object-cover rounded-full" />
        </>
      ) : (
        <div className="w-full h-full flex items-center gap-3 px-6">
          <FileUp className="h-7 w-7 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">Add {label}</p>
        </div>
      )}
    </div>
  );
};
