"use client";

import { FolderOpen, ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Media } from "@/lib/types/database";

interface FeaturedImageFieldProps {
  initialUrl?: string | null;
  media: Media[];
}

export function FeaturedImageField({ initialUrl, media }: FeaturedImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [libraryUrl, setLibraryUrl] = useState<string | null>(
    initialUrl && !initialUrl.startsWith("blob:") ? initialUrl : null
  );
  const [removeImage, setRemoveImage] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);

  const clearFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFileLabel(null);
  };

  const handleRemove = () => {
    setPreview(null);
    setLibraryUrl(null);
    setRemoveImage(true);
    clearFileInput();
  };

  const handleLocalFile = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setRemoveImage(false);
    setLibraryUrl(null);
    setFileLabel(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleSelectFromLibrary = (item: Media) => {
    setRemoveImage(false);
    clearFileInput();
    setLibraryUrl(item.url);
    setPreview(item.url);
    setPickerOpen(false);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <span className="mb-1.5 block text-sm font-medium text-navy">Featured Image</span>

      <input type="hidden" name="existingImageUrl" value={initialUrl ?? ""} />
      {libraryUrl && <input type="hidden" name="featuredImageUrl" value={libraryUrl} />}
      {removeImage && <input type="hidden" name="removeImage" value="on" />}

      <input
        ref={fileInputRef}
        id="image"
        name="image"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleLocalFile(e.target.files)}
      />

      {preview ? (
        <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
          <Image src={preview} alt="Featured preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleLocalFile(e.dataTransfer.files);
          }}
          className="mb-3 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 text-gray-400"
        >
          <ImagePlus className="size-6" />
          <span className="text-xs">No image selected</span>
          <span className="text-[11px]">Choose a source below, or drag a file here</span>
        </div>
      )}

      {fileLabel && (
        <p className="mb-3 truncate text-xs text-gray-500">
          Local file: <span className="font-medium text-navy">{fileLabel}</span>
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
        >
          <FolderOpen className="size-3.5" />
          Media Library
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
        >
          <Upload className="size-3.5" />
          This computer
        </button>
      </div>

      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Select from media library"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-navy">Media Library</h2>
                <p className="text-xs text-gray-500">Click an image to use it as the featured image.</p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                aria-label="Close"
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-navy"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {media.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-500">
                  No media yet. Upload images under{" "}
                  <a href="/admin/media" className="font-medium text-gold hover:text-navy">
                    Media
                  </a>
                  , or use &ldquo;This computer&rdquo;.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {media.map((item) => {
                    const selected = libraryUrl === item.url;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectFromLibrary(item)}
                        className={`group overflow-hidden rounded-lg border text-left transition-all ${
                          selected
                            ? "border-gold ring-2 ring-gold"
                            : "border-gray-200 hover:border-gold"
                        }`}
                      >
                        <div className="relative aspect-square bg-gray-100">
                          <Image
                            src={item.url}
                            alt={item.alt ?? item.filename}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <p className="truncate px-2 py-1.5 text-[11px] text-gray-600">{item.filename}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
