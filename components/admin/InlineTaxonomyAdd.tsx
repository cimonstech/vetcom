"use client";

import { CircleAlert, Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";

import {
  createCategory,
  createTag,
  type TaxonomyFormState,
} from "@/app/admin/taxonomy/actions";
import type { Category, Tag } from "@/lib/types/database";

type Kind = "category" | "tag";

interface InlineTaxonomyAddProps {
  kind: Kind;
  onCreated: (item: Category | Tag) => void;
}

export function InlineTaxonomyAdd({ kind, onCreated }: InlineTaxonomyAddProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const placeholder = kind === "category" ? "New category…" : "New tag…";
  const action = kind === "category" ? createCategory : createTag;

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(`Enter a ${kind} name.`);
      return;
    }

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("name", trimmed);
      const result: TaxonomyFormState = await action({ status: "idle" }, formData);

      if (result.status === "error") {
        setError(result.message ?? `Failed to create ${kind}.`);
        return;
      }

      if (result.item) {
        onCreated(result.item);
        setName("");
      }
    });
  };

  return (
    <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          disabled={isPending}
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-60"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending}
          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-navy px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
          Add
        </button>
      </div>
      {error && (
        <p className="flex items-start gap-1 text-xs text-red-600">
          <CircleAlert className="mt-0.5 size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
