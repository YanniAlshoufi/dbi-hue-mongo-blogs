import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type BlogEntry, BLOG_ENTRIES_COLLECTION } from "@/server/db/schema";
import { ObjectId } from "mongodb";
import {
  blogCategorySchema,
  blogCommentsAllowedSchema,
  blogContentElementsSchema,
  blogDescriptionSchema,
  blogTitleSchema,
  objectIdStringSchema,
} from "@/lib/validationSchemas";

const createBlogEntrySchema = z.object({
  title: blogTitleSchema,
  description: blogDescriptionSchema,
  category: blogCategorySchema,
  contentElements: blogContentElementsSchema,
  commentsAllowed: blogCommentsAllowedSchema,
});

export const postsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createBlogEntrySchema)
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      await collection.insertOne({
        title: input.title,
        description: input.description,
        authorId: ctx.auth.userId,
        createdAt: Date.now(),
        editedAt: Date.now(),
        category: input.category,
        commentsAllowed: input.commentsAllowed,
        contentElements: input.contentElements,
        impressionCount: 0,
        comments: [],
      });
    }),

  delete: protectedProcedure
    .input(z.object({ postId: objectIdStringSchema }))
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      const res = await collection.deleteOne({
        _id: new ObjectId(input.postId),
        userId: ctx.auth.userId,
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
});
