import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {type Post, POSTS_COLLECTION } from "@/server/db/schema";
import { ObjectId } from "mongodb";

export const postsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<Post>(POSTS_COLLECTION);
      await collection.insertOne({ name: input.name, userId: ctx.auth.userId, createdAt: Date.now() });
    }),

  delete: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db.collection<Post>(POSTS_COLLECTION);
      const res = await collection.deleteOne({ _id: new ObjectId(input.postId), userId: ctx.auth.userId })

      if (res.deletedCount <= 0) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),

  getAll: publicProcedure.query(async ({ctx}) => {
    const collection = ctx.db.collection<Post>(POSTS_COLLECTION);
    return await collection.find().sort({ createdAt: -1 }).toArray();
  }),
});
