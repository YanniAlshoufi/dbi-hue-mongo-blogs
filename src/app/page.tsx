import { CreateBlogForm } from "@/app/_components/create-blog-form";
import { HydrateClient } from "@/trpc/server";
import { BlogsList } from "./_components/blogs-list";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Blogs! :D
        </h1>

        <div className="flex w-150 flex-col gap-10">
          <CreateBlogForm />
          <h2 className="text-3xl">Blog list:</h2>
          <BlogsList />
        </div>
      </main>
    </HydrateClient>
  );
}
