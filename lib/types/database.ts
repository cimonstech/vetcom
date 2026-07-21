export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: PostStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

export type Media = {
  id: string;
  key: string;
  url: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PostCategory = {
  post_id: string;
  category_id: string;
};

export type PostTag = {
  post_id: string;
  tag_id: string;
};

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Post>;
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id"> & { id?: string };
        Update: Partial<Category>;
        Relationships: [];
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, "id"> & { id?: string };
        Update: Partial<Tag>;
        Relationships: [];
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<ContactSubmission>;
        Relationships: [];
      };
      post_categories: {
        Row: PostCategory;
        Insert: PostCategory;
        Update: Partial<PostCategory>;
        Relationships: [];
      };
      post_tags: {
        Row: PostTag;
        Insert: PostTag;
        Update: Partial<PostTag>;
        Relationships: [];
      };
      media: {
        Row: Media;
        Insert: Omit<Media, "id" | "created_at" | "updated_at" | "width" | "height" | "alt"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          width?: number | null;
          height?: number | null;
          alt?: string | null;
        };
        Update: Partial<Media>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
