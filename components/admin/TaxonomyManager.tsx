"use client";

import { CircleAlert, Loader2, Plus, Tags, Trash2 } from "lucide-react";
import { useActionState, useEffect, useRef, useTransition } from "react";

import {
  createCategory,
  createTag,
  deleteCategory,
  deleteTag,
  type TaxonomyFormState,
} from "@/app/admin/taxonomy/actions";
import type { Category, Tag } from "@/lib/types/database";

const initialState: TaxonomyFormState = { status: "idle" };

function CreateForm({
  label,
  placeholder,
  action,
}: {
  label: string;
  placeholder: string;
  action: (state: TaxonomyFormState, formData: FormData) => Promise<TaxonomyFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="flex gap-2">
        <input
          name="name"
          required
          placeholder={placeholder}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-navy hover:bg-gold-light disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Add
        </button>
      </div>
      {state.status === "error" && state.message && (
        <p className="flex items-start gap-1.5 text-xs text-red-600">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
          {state.message}
        </p>
      )}
      {state.status === "success" && state.message && (
        <p className="text-xs font-medium text-green-700">{state.message}</p>
      )}
      <p className="text-xs text-gray-400">{label}</p>
    </form>
  );
}

function ItemList({
  items,
  emptyLabel,
  onDelete,
}: {
  items: { id: string; name: string; slug: string }[];
  emptyLabel: string;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyLabel}</p>;
  }

  return (
    <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-navy">{item.name}</p>
            <p className="truncate text-xs text-gray-400">{item.slug}</p>
          </div>
          <button
            type="button"
            disabled={isPending}
            aria-label={`Delete ${item.name}`}
            onClick={() => {
              if (!window.confirm(`Delete “${item.name}”?`)) return;
              startTransition(async () => {
                await onDelete(item.id);
              });
            }}
            className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function TaxonomyManager({
  categories,
  tags,
}: {
  categories: Category[];
  tags: Tag[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Tags className="size-5 text-gold" />
          <h2 className="text-lg font-semibold text-navy">Categories</h2>
        </div>
        <CreateForm
          label="Categories group related posts (e.g. Telecom, ICT, Security)."
          placeholder="New category name"
          action={createCategory}
        />
        <div className="mt-5">
          <ItemList items={categories} emptyLabel="No categories yet." onDelete={deleteCategory} />
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Tags className="size-5 text-gold" />
          <h2 className="text-lg font-semibold text-navy">Tags</h2>
        </div>
        <CreateForm
          label="Tags are freer labels (e.g. fibre, NCA, Accra)."
          placeholder="New tag name"
          action={createTag}
        />
        <div className="mt-5">
          <ItemList items={tags} emptyLabel="No tags yet." onDelete={deleteTag} />
        </div>
      </section>
    </div>
  );
}
