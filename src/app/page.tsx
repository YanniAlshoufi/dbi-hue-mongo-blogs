import { CreateBlogForm } from "@/app/_components/create-blog-form";
import { HydrateClient } from "@/trpc/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BlogsList } from "./_components/blogs-list";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Blogs! :D
        </h1>

        <div className="flex w-150 flex-col gap-10">
          <BlogsList />

          <SignedOut>
            <Card className="px-5">
              <h2>Please sign in to add a post! :]</h2>
            </Card>
          </SignedOut>
          <SignedIn>
            <CreateBlogForm />
          </SignedIn>
        </div>
      </main>
    </HydrateClient>
  );
}
