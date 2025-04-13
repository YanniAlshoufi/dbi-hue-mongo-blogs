import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {BLOG_ENTRIES_COLLECTION, type BlogEntry, COMMENTS_COLLECTION, type DbiComment} from "@/server/db/schema";
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

const createCommentSchema = z.object({
    blogId: objectIdStringSchema,
    text: z.string().min(1),
});

const getCommentsSchema = z.object({
    blogId: objectIdStringSchema,
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
        category: input.category,
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


  addComment: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const blogCollection = ctx.db.collection<BlogEntry>(
        BLOG_ENTRIES_COLLECTION,
      );
      const commentsCollection =
        ctx.db.collection<DbiComment>(COMMENTS_COLLECTION);

      const blog = await blogCollection.findOne({
        _id: new ObjectId(input.blogId),
      });

      if (!blog || !blog.commentsAllowed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Blog not found or comments are disabled.",
        });
      }

      const newComment: DbiComment = {
        blogId: new ObjectId(input.blogId),
        authorId: ctx.auth.userId,
        text: input.text,
        creationDate: new Date(),
      };

      await commentsCollection.insertOne(newComment);
      return newComment;
    }),
  getComments: publicProcedure
    .input(getCommentsSchema)
    .query(async ({ ctx, input }) => {
      const commentsCollection =
        ctx.db.collection<DbiComment>(COMMENTS_COLLECTION);

      return await commentsCollection
        .find({ blogId: new ObjectId(input.blogId) })
        .sort({ creationDate: -1 })
        .toArray();
    }),
});
