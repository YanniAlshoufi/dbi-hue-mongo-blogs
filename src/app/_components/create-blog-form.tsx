"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { z } from "zod";

export function LatestPost() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [isHoveringOverSubmit, setIsHoveringOverSubmit] = useState(false);
  const createPost = api.posts.create.useMutation({
    onSuccess: async () => {
      await utils.posts.getAll.invalidate();
      setName("");
    },
  });

  const titleSchema = z.string().trim().min(1);

  return (
    <Card className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title: name.trim() });
        }}
        className="flex flex-col gap-5 px-5"
      >
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full bg-white/30 px-4 py-2 text-gray-100"
          />
          <button
            type="submit"
            className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white transition hover:bg-white/20 disabled:bg-white/30 ${
              titleSchema.safeParse(name).error !== undefined ||
              createPost.isPending
                ? "cursor-help"
                : ""
            }`}
            disabled={
              titleSchema.safeParse(name).error !== undefined ||
              createPost.isPending
            }
            onMouseOver={() => setIsHoveringOverSubmit(true)}
            onMouseLeave={() => setIsHoveringOverSubmit(false)}
          >
            {createPost.isPending ? (
              <>{"Submitting..."}</>
            ) : titleSchema.safeParse(name).error !== undefined ? (
              <p>?</p>
            ) : (
              <span className="icon-[mingcute--check-fill]" />
            )}
          </button>
        </div>
        {isHoveringOverSubmit &&
        (titleSchema.safeParse(name).error !== undefined ||
          createPost.isPending) ? (
          <p>Give the post a name before you can submit.</p>
        ) : (
          <></>
        )}
      </form>
    </Card>
  );
}
