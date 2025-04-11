"use client";

import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  blogCategorySchema,
  blogCommentsAllowedSchema,
  blogContentElementsSchema,
  blogDescriptionSchema,
  blogTitleSchema,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: blogTitleSchema,
  description: blogDescriptionSchema,
  category: blogCategorySchema,
  commentsAllowed: blogCommentsAllowedSchema,
  contentElements: blogContentElementsSchema,
});

export function CreateBlogForm() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "news",
      commentsAllowed: true,
      contentElements: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPost.mutate({
      title: values.title,
      description: values.description,
      category: values.category,
      commentsAllowed: values.commentsAllowed,
      contentElements: [],
    });
  }

  const createPost = api.blogs.create.useMutation({
    onSuccess: async () => {
      await utils.blogs.getAll.invalidate();
    },
  });

  return (
    <Card className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="My cool blog! :D"
                    className="w-full rounded-full bg-white/30 px-4 py-2 text-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="My cool description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="min-w-40">
                      <SelectValue placeholder="Choose a category!" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectGroup>
                        <SelectLabel>Possible Categories:</SelectLabel>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commentsAllowed"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Label>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    Do you want to allow comments on your blog?
                  </Label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentElements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (the actual blog)</FormLabel>
                <FormControl>
                  {/* jklsadjfl ksajdfk saldfj kjlkasdjflk sadjflksd jflk sd */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white transition hover:bg-white/20 disabled:bg-white/30`}
            disabled={createPost.isPending}
          >
            {createPost.isPending ? (
              <>{"Submitting..."}</>
            ) : (
              <span className="icon-[mingcute--check-fill]" />
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
