import { db } from "@/server/db";
import { BLOG_ENTRIES_COLLECTION, type BlogEntry } from "@/server/db/schema";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

export default async function Index({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const collection = db.collection<BlogEntry>(BLOG_ENTRIES_COLLECTION);
  const blog = await collection.findOne({
    _id: new ObjectId((await params).blogId),
  });

  return (
    <div className="flex justify-center">
      <main className="prose-lg bg-background mt-10 flex max-w-15/16 min-w-3/5 flex-col items-center px-20 py-10 shadow ring ring-white">
        <article className="max-w-prose">
          <h1>{blog?.title}</h1>

          {blog?.contentElements.map((contentElement, idx) => (
            <div key={idx}>
              {contentElement.type === "h1" ? (
                <h1>{contentElement.content.text}</h1>
              ) : contentElement.type === "h2" ? (
                <h2>{contentElement.content.text}</h2>
              ) : contentElement.type === "h3" ? (
                <h3>{contentElement.content.text}</h3>
              ) : contentElement.type === "h4" ? (
                <h4>{contentElement.content.text}</h4>
              ) : contentElement.type === "h5" ? (
                <h5>{contentElement.content.text}</h5>
              ) : contentElement.type === "h6" ? (
                <h6>{contentElement.content.text}</h6>
              ) : contentElement.type === "text" ? (
                <p>{contentElement.content.text}</p>
              ) : contentElement.type === "link" ? (
                <Link href={contentElement.content.link}>
                  {contentElement.content.displayText}
                </Link>
              ) : contentElement.type === "image" ? (
                <Image
                  src={`data:image/png;base64, ${contentElement.content.base64}`}
                  alt={contentElement.content.alt}
                />
              ) : (
                <p>Sorry, this element cannot be displayed.</p>
              )}
            </div>
          ))}
        </article>
      </main>
    </div>
  );
}
