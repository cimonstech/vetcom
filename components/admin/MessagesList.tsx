"use client";

import { Mail, Phone, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { deleteContactSubmission } from "@/app/admin/messages/actions";
import type { ContactSubmission } from "@/lib/types/database";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageRow({ item }: { item: ContactSubmission }) {
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm(`Delete message from ${item.name}?`)) return;
    startTransition(async () => {
      await deleteContactSubmission(item.id);
    });
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <p className="font-semibold text-navy">{item.name}</p>
          <p className="mt-0.5 truncate text-sm text-gray-500">{item.email}</p>
          <p className="mt-2 line-clamp-1 text-sm text-gray-600">{item.message}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-gray-400">{formatDate(item.created_at)}</p>
          <p className="mt-2 text-xs font-medium text-gold">{expanded ? "Hide" : "View"}</p>
        </div>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-gray-100 px-5 py-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <a
              href={`mailto:${item.email}`}
              className="inline-flex items-center gap-1.5 font-medium text-navy hover:text-gold"
            >
              <Mail className="size-4" />
              {item.email}
            </a>
            {item.phone && (
              <a
                href={`tel:${item.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 font-medium text-navy hover:text-gold"
              >
                <Phone className="size-4" />
                {item.phone}
              </a>
            )}
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{item.message}</p>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" />
            {isPending ? "Deleting…" : "Delete"}
          </button>
        </div>
      )}
    </article>
  );
}

export function MessagesList({ messages }: { messages: ContactSubmission[] }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No messages yet. Submissions from the contact form will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((item) => (
        <MessageRow key={item.id} item={item} />
      ))}
    </div>
  );
}
