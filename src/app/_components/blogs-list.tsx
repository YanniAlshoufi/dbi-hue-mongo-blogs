"use client";

import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { WithId } from "mongodb";
import type { BlogEntry } from "@/server/db/schema";
import { useRouter } from "next/navigation";

export function BlogsList() {
  const { error, isLoading, data: posts } = api.blogs.getAll.useQuery();

  if (error !== null) {
    return <h2>Sorry, an error occured!</h2>;
  }

  return (
    <ScrollArea className="h-100 w-full">
      <div className="w-full">
        <ul className="flex w-full flex-col gap-2">
          {isLoading || posts === undefined ? (
            <>
              <li className="h-21.5 w-full">
                <Skeleton className="bg-card h-full w-full" />
              </li>
              <li className="h-21.5 w-full">
                <Skeleton className="bg-card h-full w-full" />
              </li>
            </>
          ) : posts.length <= 0 ? (
            <p className="text-xl text-neutral-500">
              There aren't any blogs currently :(
            </p>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard blog={post} key={post._id.toString()} />
              ))}
            </>
          )}
        </ul>
      </div>
    </ScrollArea>
  );
}

function PostCard(props: { blog: WithId<BlogEntry> }) {
  const apiUtils = api.useUtils();
  const deletionMutation = api.blogs.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.blogs.getAll.invalidate();
    },
  });
  const router = useRouter();

  return (
    <li className="cursor-pointer transition-[scale] ease-in hover:scale-99">
      <Card
        className="flex-row justify-between px-5"
        onClick={() => router.push(`/blogs/${props.blog._id.toString()}`)}
      >
        "{props.blog.title}" the user with ID {props.blog.authorId.toString()}
        {isSignedIn && props.blog.authorId === userId ? (
          <Button
            className="hover:to-card bg-transparent shadow-none"
            onClick={async () =>
              await deletionMutation.mutateAsync({
                postId: props.blog._id.toString(),
              })
            }
          >
            {deletionMutation.isPending ? (
              <Spinner size="sm" className="bg-black dark:bg-white" />
            ) : (
              <span className="icon-[mingcute--delete-fill] text-gray-200 hover:text-white"></span>
            )}
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </li>
  );
}
