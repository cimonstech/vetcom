"use client";

import { CircleAlert, ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useRef, useState } from "react";

import { savePost, type PostFormState } from "@/app/admin/posts/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { Category, Post, Tag } from "@/lib/types/database";
import { slugify } from "@/lib/utils/slugify";

const initialState: PostFormState = { status: "idle" };

interface PostFormProps {
  post?: Post;
  categories: Category[];
  tags: Tag[];
  selectedCategoryIds: string[];
  selectedTagIds: string[];
}

export function PostForm({ post, categories, tags, selectedCategoryIds, selectedTagIds }: PostFormProps) {
  const [state, formAction, pending] = useActionState(savePost, initialState);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(post?.featured_image ?? null);
  const [removeImage, setRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleImageChange = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form action={formAction} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="existingImageUrl" value={post?.featured_image ?? ""} />
      {removeImage && <input type="hidden" name="removeImage" value="on" />}

      {state.status === "error" && state.message && (
        <div role="alert" className="flex items-start gap-2.5 rounded-md bg-red-50 p-3.5 text-sm text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-navy">
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder="Enter post title"
            />

            <label htmlFor="slug" className="mb-1.5 mt-4 block text-sm font-medium text-navy">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder="post-url-slug"
            />

            <label htmlFor="excerpt" className="mb-1.5 mt-4 block text-sm font-medium text-navy">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt ?? ""}
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              placeholder="A short summary shown on the blog listing page"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="mb-1.5 block text-sm font-medium text-navy">Content</span>
            <RichTextEditor initialContent={post?.content ?? ""} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="mb-1.5 block text-sm font-medium text-navy">Status</span>
            <select
              name="status"
              defaultValue={post?.status ?? "draft"}
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="mb-1.5 block text-sm font-medium text-navy">Featured Image</span>
            {imagePreview ? (
              <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <Image src={imagePreview} alt="Featured preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                  className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const dropped = e.dataTransfer.files;
                  if (fileInputRef.current && dropped?.length) {
                    const dt = new DataTransfer();
                    dt.items.add(dropped[0]);
                    fileInputRef.current.files = dt.files;
                  }
                  handleImageChange(dropped);
                }}
                className="mb-3 flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-gold hover:text-gold"
              >
                <ImagePlus className="size-6" />
                <span className="text-xs">Drag & drop or click to upload</span>
                <span className="text-[11px] text-gray-400">Up to 10 MB</span>
              </label>
            )}
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="text-xs"
              onChange={(e) => handleImageChange(e.target.files)}
            />
            <label htmlFor="featuredImageUrl" className="mb-1.5 mt-3 block text-xs font-medium text-gray-500">
              Or paste a Media Library URL
            </label>
            <input
              id="featuredImageUrl"
              name="featuredImageUrl"
              type="url"
              placeholder="https://….r2.dev/media/…"
              onChange={(e) => {
                const value = e.target.value.trim();
                if (value) {
                  setRemoveImage(false);
                  setImagePreview(value);
                }
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
            <p className="mt-2 text-xs text-gray-400">
              Upload in{" "}
              <a href="/admin/media" className="font-medium text-gold hover:text-navy">
                Media
              </a>
              , copy the URL, then paste it here — or attach a file above.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-navy">Categories</span>
              <a href="/admin/taxonomy" className="text-xs font-medium text-gold hover:text-navy">
                Manage
              </a>
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {categories.length === 0 && (
                <p className="text-xs text-gray-400">
                  No categories yet.{" "}
                  <a href="/admin/taxonomy" className="font-medium text-gold hover:text-navy">
                    Create some
                  </a>{" "}
                  then check them here.
                </p>
              )}
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="categoryIds"
                    value={category.id}
                    defaultChecked={selectedCategoryIds.includes(category.id)}
                    className="size-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-navy">Tags</span>
              <a href="/admin/taxonomy" className="text-xs font-medium text-gold hover:text-navy">
                Manage
              </a>
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {tags.length === 0 && (
                <p className="text-xs text-gray-400">
                  No tags yet.{" "}
                  <a href="/admin/taxonomy" className="font-medium text-gold hover:text-navy">
                    Create some
                  </a>{" "}
                  then check them here.
                </p>
              )}
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="tagIds"
                    value={tag.id}
                    defaultChecked={selectedTagIds.includes(tag.id)}
                    className="size-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending && <Loader2 className="size-4 animate-spin" />}
            {pending ? "Saving..." : post ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
