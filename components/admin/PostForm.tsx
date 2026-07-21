"use client";

import { CircleAlert, Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

import { savePost, type PostFormState } from "@/app/admin/posts/actions";
import { FeaturedImageField } from "@/components/admin/FeaturedImageField";
import { InlineTaxonomyAdd } from "@/components/admin/InlineTaxonomyAdd";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { Category, Media, Post, Tag } from "@/lib/types/database";
import { slugify } from "@/lib/utils/slugify";

const initialState: PostFormState = { status: "idle" };

interface PostFormProps {
  post?: Post;
  categories: Category[];
  tags: Tag[];
  media: Media[];
  selectedCategoryIds: string[];
  selectedTagIds: string[];
}

export function PostForm({
  post,
  categories,
  tags,
  media,
  selectedCategoryIds,
  selectedTagIds,
}: PostFormProps) {
  const [state, formAction, pending] = useActionState(savePost, initialState);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");

  const [categoryList, setCategoryList] = useState(categories);
  const [tagList, setTagList] = useState(tags);
  const [checkedCategoryIds, setCheckedCategoryIds] = useState(() => new Set(selectedCategoryIds));
  const [checkedTagIds, setCheckedTagIds] = useState(() => new Set(selectedTagIds));

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  return (
    <form action={formAction} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="content" value={content} />

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

          <FeaturedImageField initialUrl={post?.featured_image} media={media} />

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-navy">Categories</span>
              <a href="/admin/taxonomy" className="text-xs font-medium text-gold hover:text-navy">
                Manage
              </a>
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {categoryList.length === 0 && (
                <p className="text-xs text-gray-400">No categories yet — add one below.</p>
              )}
              {categoryList.map((category) => (
                <label key={category.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="categoryIds"
                    value={category.id}
                    checked={checkedCategoryIds.has(category.id)}
                    onChange={(e) => {
                      setCheckedCategoryIds((prev) => {
                        const next = new Set(prev);
                        if (e.target.checked) next.add(category.id);
                        else next.delete(category.id);
                        return next;
                      });
                    }}
                    className="size-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <InlineTaxonomyAdd
              kind="category"
              onCreated={(item) => {
                setCategoryList((prev) =>
                  prev.some((c) => c.id === item.id)
                    ? prev
                    : [...prev, item as Category].sort((a, b) => a.name.localeCompare(b.name))
                );
                setCheckedCategoryIds((prev) => new Set(prev).add(item.id));
              }}
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-navy">Tags</span>
              <a href="/admin/taxonomy" className="text-xs font-medium text-gold hover:text-navy">
                Manage
              </a>
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {tagList.length === 0 && (
                <p className="text-xs text-gray-400">No tags yet — add one below.</p>
              )}
              {tagList.map((tag) => (
                <label key={tag.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="tagIds"
                    value={tag.id}
                    checked={checkedTagIds.has(tag.id)}
                    onChange={(e) => {
                      setCheckedTagIds((prev) => {
                        const next = new Set(prev);
                        if (e.target.checked) next.add(tag.id);
                        else next.delete(tag.id);
                        return next;
                      });
                    }}
                    className="size-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  {tag.name}
                </label>
              ))}
            </div>
            <InlineTaxonomyAdd
              kind="tag"
              onCreated={(item) => {
                setTagList((prev) =>
                  prev.some((t) => t.id === item.id)
                    ? prev
                    : [...prev, item as Tag].sort((a, b) => a.name.localeCompare(b.name))
                );
                setCheckedTagIds((prev) => new Set(prev).add(item.id));
              }}
            />
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
