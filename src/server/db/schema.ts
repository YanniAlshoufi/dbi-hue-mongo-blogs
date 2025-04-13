import type { ObjectId } from "mongodb";

export const BLOG_CATEGORIES_COLLECTION = "blogCategories";
export type BlogCategory = {
  key:
    | "news"
    | "fashion"
    | "fitness"
    | "diy"
    | "infographics"
    | "listicles"
    | "case_study"
    | "interviews"
    | "business"
    | "romance"
    | "other";
  value:
    | "News"
    | "Fashion"
    | "Fitness"
    | "DIY"
    | "Infographics"
    | "Listicles"
    | "Case Studies"
    | "Interviews"
    | "Business"
    | "Romance"
    | "Other";
};

export const BLOG_ENTRIES_COLLECTION = "blogEntries";
export type BlogEntry = {
  title: string;
  authorId: ObjectId;
  description: string;
  categoryKey:
    | "news"
    | "fashion"
    | "fitness"
    | "diy"
    | "infographics"
    | "listicles"
    | "case_study"
    | "interviews"
    | "business"
    | "romance"
    | "other";
  createdAt: number;
  editedAt: number | null;
  impressionCount: number;
  contentElements: (
    | {
        type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "text";
        content: { text: string };
      }
    | { type: "image"; content: { base64: string; alt: string } }
    | { type: "link"; content: { link: string; displayText: string } }
  )[];
  commentsAllowed: boolean;
  comments: Comment[];
};

export const COMMENTS_COLLECTION = "comments";
export type Comment = {
  blogId: ObjectId;
  authorId: ObjectId;
  text: string;
  createdAt: number;
};

export const BLOG_USERS_COLLECTION = "blogUsers";
export type BlogUser = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  rawPassword: string;
};
