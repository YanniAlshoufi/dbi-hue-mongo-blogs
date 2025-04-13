import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  type BlogCategory,
  type BlogEntry,
  BLOG_CATEGORIES_COLLECTION,
  BLOG_ENTRIES_COLLECTION,
} from "@/server/db/schema";
import { ObjectId } from "mongodb";
import {
  blogCategorySchema,
  blogCommentsAllowedSchema,
  blogContentElementsSchema,
  blogDescriptionSchema,
  blogTitleSchema,
} from "@/lib/validationSchemas";
import { objectIdStringSchema } from "@/lib/mongoSchemas/mongoSchemas";

const createBlogEntrySchema = z.object({
  title: blogTitleSchema,
  description: blogDescriptionSchema,
  category: blogCategorySchema,
  contentElements: blogContentElementsSchema,
  commentsAllowed: blogCommentsAllowedSchema,
});

export const blogsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.intersection(createBlogEntrySchema, z.object({ userId: z.string() })),
    )
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      const res = await collection.insertOne({
        title: input.title,
        description: input.description,
        authorId: new ObjectId(input.userId),
        createdAt: Date.now(),
        editedAt: Date.now(),
        categoryKey: input.category,
        commentsAllowed: input.commentsAllowed,
        contentElements: input.contentElements,
        impressionCount: 0,
        comments: [],
      });
      console.info("Created blog with id", res.insertedId);
    }),

  delete: publicProcedure
    .input(
      z.intersection(
        z.object({ postId: objectIdStringSchema }),
        z.object({ userId: objectIdSchema }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      const res = await collection.deleteOne({
        _id: new ObjectId(input.postId),
        authorId: input.userId,
      });

      if (!res.acknowledged) {
        console.error("Some error happened!");
      }

      if (res.deletedCount <= 0) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
    return await collection.find().sort({ createdAt: -1 }).toArray();
  }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const collection = ctx.db.collection<BlogCategory>(
      BLOG_CATEGORIES_COLLECTION,
    );
    return await collection.find().toArray();
  }),
});
