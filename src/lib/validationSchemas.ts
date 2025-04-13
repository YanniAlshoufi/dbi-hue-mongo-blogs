import { z } from "zod";
import { POSSIBLE_CATEGORY_KEYS } from "./categories/possibleCategories";
import { objectIdSchema } from "./mongoSchemas/mongoSchemas";

// Blog Comment

export const blogCommentTextSchema = z
  .string({ message: "The comment text provided must be a string." })
  .nonempty("The comment text provided cannot be empty.");

export const blogCommentSchema = z.object(
  {
    blogId: objectIdSchema,
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

export const blogCategorySchema = z.enum(POSSIBLE_CATEGORY_KEYS, {
  message:
    'The category of a blog must be one of: "news", "fashion", "fitness", "DIY", "infographics", "listicles", "case studies", "interviews", "business", "romance", or "other"',
});

export const blogContentElementsSchema = z.array(
  z.union([
    z.object({
      type: z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "text"]),
      content: z.object({
        text: z.string({ message: "The content provided must be a string." }),
      }),
    }),
    z.object({
      type: z.literal("link"),
      content: z.object({
        displayText: z
          .string({ message: "The display text of a link must be a string." })
          .trim()
          .nonempty("The display text of a link cannot be empty."),
        link: z
          .string({
            message: "The link of a link element must be a string.",
          })
          .url("The link of a link element must be a valid url."),
      }),
    }),
    z.object({
      type: z.literal("image"),
      content: z.object({
        base64: z
          .string({
            message: "The base64 version of an image must be a string.",
          })
          .base64("The base64 version of an image must be valid base64."),
        alt: z
          .string({
            message:
              "The alternative text of an image element must be a string.",
          })
          .trim()
          .nonempty(
            "The alternative text of an image element must not be empty.",
          ),
      }),
    }),
  ]),
);

export const blogCommentsAllowedSchema = z.boolean({
  message:
    "The value provided for whether comments are allowed or not must be a boolean.",
});
