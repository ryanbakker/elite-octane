"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center flex h-[385px] cursor-pointer flex-col overflow-hidden rounded-lg bg-grey-50 form-uploader"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center rounded-md"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-5 text-grey-500">
          <UploadCloud size={70} />
          <h3 className="py-5 text-xl font-medium">Upload Image</h3>
          <Button
            type="button"
            className="rounded-md bg-transparent border border-sky-950 hover:dark:border-sky-600 text-sky-200 hover:dark:bg-sky-800 transition-all hover:dark:text-white"
          >
            Select File
          </Button>
        </div>
      )}
    </div>
  );
}
