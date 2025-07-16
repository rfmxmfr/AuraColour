"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { atom, useAtom } from "jotai";

export const uploadedFilesAtom = atom<File[]>([]);
export const uploadedUrlsAtom = atom<string[]>([]);

interface DropzoneUploadProps {
  maxFiles?: number;
  onUploadComplete?: (urls: string[]) => void;
  className?: string;
}

export default function DropzoneUpload({
  maxFiles = 3,
  onUploadComplete,
  className = "",
}: DropzoneUploadProps) {
  const [files, setFiles] = useAtom(uploadedFilesAtom);
  const [urls, setUrls] = useAtom(uploadedUrlsAtom);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const filesToUpload = acceptedFiles.slice(0, maxFiles);
    setFiles(filesToUpload);
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      filesToUpload.forEach(file => formData.append("files", file));

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUrls(data.urls);
      if (onUploadComplete) onUploadComplete(data.urls);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  }, [maxFiles, onUploadComplete, setFiles, setUrls]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400"
        } ${className}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <PhotoIcon className="h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive ? "Drop the files here..." : "Drag & drop photos here, or click to select"}
          </p>
          <p className="text-xs text-gray-500">Upload up to {maxFiles} photos (JPEG, PNG)</p>
        </div>
      </div>

      {isUploading && (
        <div className="text-center py-2">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-purple-500 border-r-transparent"></div>
          <p className="text-sm text-gray-600 mt-2">Uploading...</p>
        </div>
      )}

      {uploadError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{uploadError}</div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="h-24 w-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}