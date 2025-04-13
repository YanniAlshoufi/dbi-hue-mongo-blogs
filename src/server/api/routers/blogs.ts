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
  create: protectedProcedure
    .input(createBlogEntrySchema)
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      const res = await collection.insertOne({
        title: input.title,
        description: input.description,
        authorId: ctx.auth.userId,
        createdAt: Date.now(),
        editedAt: Date.now(),
        Key: input.category,
        commentsAllowed: input.commentsAllowed,
        contentElements: input.contentElements,
        impressionCount: 0,
        comments: [],
      });
      console.info("Created blog with id", res.insertedId);
    }),

  delete: protectedProcedure
    .input(z.object({ postId: objectIdStringSchema }))
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
      const res = await collection.deleteOne({
        _id: new ObjectId(input.postId),
        authorId: ctx.auth.userId,
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
