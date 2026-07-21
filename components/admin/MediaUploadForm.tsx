"use client";

import { CircleAlert, CloudUpload, FileImage, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useCallback, useEffect, useRef, useState, useTransition } from "react";

import { uploadMedia, type MediaFormState } from "@/app/admin/media/actions";

const initialState: MediaFormState = { status: "idle" };
const MAX_BYTES = 10 * 1024 * 1024;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaUploadForm() {
  const [state, formAction, pending] = useActionState(uploadMedia, initialState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const busy = pending || isPending;

  const clearFile = useCallback(() => {
    setFile(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const acceptFile = useCallback(
    (next: File | null | undefined) => {
      setLocalError(null);
      if (!next) return;

      if (!next.type.startsWith("image/")) {
        setLocalError("Please choose an image file (JPG, PNG, WebP, or GIF).");
        return;
      }
      if (next.size > MAX_BYTES) {
        setLocalError("Image must be 10 MB or smaller.");
        return;
      }

      clearFile();
      setFile(next);
      setPreview(URL.createObjectURL(next));
    },
    [clearFile]
  );

  useEffect(() => {
    if (state.status === "success") {
      clearFile();
      setAlt("");
      formRef.current?.reset();
    }
  }, [state, clearFile]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!file) {
      setLocalError("Please choose an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    formData.set("alt", alt);

    startTransition(() => {
      formAction(formData);
    });
  };

  const errorMessage = localError ?? (state.status === "error" ? state.message : null);

  return (
    <form ref={formRef} onSubmit={onSubmit} className="rounded-xl border border-gray-200 bg-white p-5">
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          setDragging(false);
        }}
        onDrop={onDrop}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          dragging
            ? "border-gold bg-gold/5"
            : preview
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 bg-gray-50 hover:border-gold/60 hover:bg-gold/[0.03]"
        }`}
      >
        {preview ? (
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-white sm:w-48">
              <Image src={preview} alt="Upload preview" fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate text-sm font-medium text-navy">
                <FileImage className="size-4 shrink-0 text-gold" />
                {file?.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">{file ? formatBytes(file.size) : null}</p>
              <button
                type="button"
                onClick={clearFile}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700"
              >
                <X className="size-3.5" />
                Remove file
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 px-6 py-12 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-navy/5 text-navy">
              <CloudUpload className="size-7" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-navy">
                Drag & drop an image here
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                or click to browse · JPG, PNG, WebP, GIF · up to 10 MB
              </span>
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          id="file"
          name="file"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="alt" className="mb-1.5 block text-sm font-medium text-navy">
            Alt text <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="alt"
            name="alt"
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the image for accessibility"
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        <button
          type="submit"
          disabled={busy || !file}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <CloudUpload className="size-4" />}
          {busy ? "Uploading..." : "Upload to library"}
        </button>
      </div>

      {errorMessage && (
        <div role="alert" className="mt-3 flex items-start gap-2.5 rounded-md bg-red-50 p-3 text-sm text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {state.status === "success" && state.message && (
        <p className="mt-3 text-sm font-medium text-green-700">{state.message}</p>
      )}
    </form>
  );
}
