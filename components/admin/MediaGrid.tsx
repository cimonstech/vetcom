"use client";

import { Check, Copy, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { deleteMedia } from "@/app/admin/media/actions";
import type { Media } from "@/lib/types/database";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function MediaCard({ item }: { item: Media }) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete "${item.filename}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteMedia(item.id);
    });
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={item.url}
          alt={item.alt ?? item.filename}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy URL"
            className="flex size-9 items-center justify-center rounded-full bg-white text-navy hover:bg-gold"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete"
            className="flex size-9 items-center justify-center rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="truncate text-xs font-medium text-navy">{item.filename}</p>
        <p className="text-xs text-gray-400">{formatBytes(item.size_bytes)}</p>
      </div>
    </div>
  );
}

export function MediaGrid({ media }: { media: Media[] }) {
  if (media.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No media uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {media.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
