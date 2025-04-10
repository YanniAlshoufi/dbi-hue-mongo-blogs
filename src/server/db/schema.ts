import type { ObjectId } from "mongodb";

export const BLOG_ENTRIES_COLLECTION = "blogEntries";
export type BlogEntry = {
  title: string;
  authorIds: string[]; // These IDs come from Clerk, thus strings
  description: string;
  category:
    | "news"
    | "fashion"
    | "fitness"
    | "diy"
    | "infographics"
    | "listicles"
    | "case studies"
    | "interviews"
    | "business"
    | "romance"
    | "other";
  createdAt: number;
  editedAt: number;
  impressionCount: number;
  contentElements: {
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "text" | "image" | "link";
    content: unknown;
  }[];
  commentsAllowed: boolean;
  comments: Comment[];
};

export const COMMENTS_COLLECTION = "comments";

export type Comment = {
  blogId: ObjectId;
  authorId: string;
  text: string;
  creationDate: Date;
};
