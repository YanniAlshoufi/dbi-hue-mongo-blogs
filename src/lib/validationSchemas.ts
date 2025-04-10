import { ObjectId } from "mongodb";
import { z } from "zod";

// MongoDB

export const objectIdSchema = z.instanceof(ObjectId, {
  message: "The id provided must be a valid Object ID.",
});

// Clerk

export const clerkUserIdSchema = z
  .string({ message: "The ID provided must be a string." })
  .nonempty("The ID provided cannot be empty.");

// Blog Comment

export const blogCommentTextSchema = z
  .string({ message: "The comment text provided must be a string." })
  .nonempty("The comment text provided cannot be empty.");

export const blogCommentSchema = z.object({
  blogId: objectIdSchema,
  autherId: clerkUserIdSchema,
  text: blogCommentTextSchema,
});

// Blog Entry

export const blogTitleSchema = z
  .string({
    message: "The title provided must be a string.",
  })
  .trim()
  .min(1, "A title with a length of at least one character must be provided.")
  .max(256, "The title of a blog cannot exceed 256 characters")
  .regex(
    /^[-_a-zA-Z0-9]+$/,
    "The title of a blog may only contain letters, digits, hyphens (-), and underscores (_).",
  );

export const blogDescriptionSchema = z
  .string({ message: "The description provided must be a string." })
  .min(1, "A description with at least one character must be provided.")
  .max(1024, "A blog description cannot exceed 1024 characters.");

export const blogCategorySchema = z.enum(
  [
    "news",
    "fashion",
    "fitness",
    "diy",
    "infographics",
    "listicles",
    "case studies",
    "interviews",
    "business",
    "romance",
    "other",
  ],
  {
    message:
      'The category of a blog must be one of: "news", "fashion", "fitness", "diy", "infographics", "listicles", "case studies", "interviews", "business", "romance", or "other"',
  },
);

export const blogImpressionCountSchema = z
  .number({ message: "The impression count provided must be a valid number." })
  .nonnegative("The impression count cannot be negative.")
  .int("The impression count must be a valid integer.")
  .finite("The impression count must be finite.")
  .refine(
    (x) => !Number.isNaN(x),
    "The blog impression provided cannot be NaN.",
  );

export const blogContentElementsSchema = z.array(
  z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "text", "image", "link"], {
    message:
      'The impression count provided must be one of: "h1", "h2", "h3", "h4", "h5", "h6", "text", "image", or "link"',
  }),
  { message: "The content elements of the blog provided must be in an array." },
);

export const blogCommentsAllowedSchema = z.boolean({
  message:
    "The value provided for whether comments are allowed or not must be a boolean.",
});

export const blogEntrySchema = z.object({
  title: blogTitleSchema,
  authorIds: z.array(clerkUserIdSchema, {
    message: "The author IDs provided must be in an array.",
  }),
  description: blogDescriptionSchema,
  category: blogCategorySchema,
  impressionCount: blogImpressionCountSchema,
  contentElements: blogContentElementsSchema,
  commentsAllowed: blogCommentsAllowedSchema,
  comments: z.array(blogCommentSchema, {
    message: "The comments of the blog must be in an array.",
  }),
});
