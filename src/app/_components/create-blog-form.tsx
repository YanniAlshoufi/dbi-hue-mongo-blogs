"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  blogCategorySchema,
  blogCommentsAllowedSchema,
  blogContentElementsSchema,
  blogDescriptionSchema,
  blogTitleSchema,
  type PossibleCategory,
} from "@/lib/validationSchemas";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { possibleCategories } from "@/lib/categories/possibleCategories";

export function LatestPost() {
  const utils = api.useUtils();

  const [name, setName] = useState<z.infer<typeof blogTitleSchema>>("");
  const [description, setDescription] =
    useState<z.infer<typeof blogDescriptionSchema>>("");
  const [category, setCategory] = useState<
    z.infer<typeof blogCategorySchema> | undefined
  >();
  const [commentsAllowed, setCommentsAllowed] =
    useState<z.infer<typeof blogCommentsAllowedSchema>>(false);
  const [contentElements, setContentElements] =
    useState<z.infer<typeof blogContentElementsSchema>>();

  const [validationError, setValidationError] = useState("");

  const createPost = api.posts.create.useMutation({
    onError: (error) => {
      const err: { message?: string } = JSON.parse(error.message)[0];
      console.log(error);

      setValidationError(err.message ?? "");
    },
    onSuccess: async () => {
      await utils.posts.getAll.invalidate();
      setName("");
    },
  });

  return (
    <Card className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({
            title: name.trim(),
            category: "business",
            commentsAllowed: true,
            contentElements: [],
            description: "",
          });
        }}
        className="flex flex-col gap-5 px-5"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/30 px-4 py-2 text-gray-100"
        />
        <Textarea
          placeholder="description"
          value={description}
          onInput={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        />

        <Select
          value={category}
          onValueChange={(c: PossibleCategory) => {
            setCategory(c);
          }}
        >
          <SelectTrigger className="min-w-40">
            <SelectValue placeholder="Choose a category!" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <>
                {possibleCategories.map((c) => (
                  <SelectItem value={c} key={c}>
                    {c}
                  </SelectItem>
                ))}
              </>
            </SelectGroup>
          </SelectContent>
        </Select>

        <button
          type="submit"
          className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white transition hover:bg-white/20 disabled:bg-white/30`}
          disabled={createPost.isPending}
        >
          {createPost.isPending ? (
            <>{"Submitting..."}</>
          ) : (
            <span className="icon-[mingcute--check-fill]" />
          )}
        </button>

        {validationError.length > 0 ? <p>{validationError}</p> : <></>}
      </form>
    </Card>
  );
}
