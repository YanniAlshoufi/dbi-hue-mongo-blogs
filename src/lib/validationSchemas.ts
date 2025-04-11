import { z } from "zod";
import { possibleCategories } from "./categories/possibleCategories";
// import { objectIdSchema } from "./mongoSchemas/mongoSchemas";

// Blog Comment

export const blogCommentTextSchema = z
  .string({ message: "The comment text provided must be a string." })
  .nonempty("The comment text provided cannot be empty.");

export const blogCommentSchema = z.object(
  {
    // blogId: objectIdSchema,
    text: blogCommentTextSchema,
  },
  { message: "The blog comment provided must be an object." },
);

// Blog Entry

export const blogTitleSchema = z
  .string({
    message: "The title provided must be a string.",
  })
  .trim()
  .min(1, "A title with a length of at least one character must be provided.")
  .max(128, "The title of a blog cannot exceed 256 characters");

export const blogDescriptionSchema = z
  .string({ message: "The description provided must be a string." })
  .min(1, "A description with at least one character must be provided.")
  .max(1024, "A blog description cannot exceed 1024 characters.");

export type PossibleCategory = (typeof possibleCategories)[number];
export const blogCategorySchema = z.enum(possibleCategories, {
  message:
    'The category of a blog must be one of: "news", "fashion", "fitness", "DIY", "infographics", "listicles", "case studies", "interviews", "business", "romance", or "other"',
});

export const blogContentElementsSchema = z.array(
  z.object(
    {
      type: z.enum(
        ["h1", "h2", "h3", "h4", "h5", "h6", "text", "image", "link"],
        {
          message:
            'The impression count provided must be one of: "h1", "h2", "h3", "h4", "h5", "h6", "text", "image", or "link"',
        },
      ),
      content: z.string({ message: "The content provided must be a string." }),
    },
    {
      message: "The blog content elements provided must all be an object each.",
    },
  ),
  { message: "The content elements of the blog provided must be in an array." },
);

export const blogCommentsAllowedSchema = z.boolean({
  message:
    "The value provided for whether comments are allowed or not must be a boolean.",
});
