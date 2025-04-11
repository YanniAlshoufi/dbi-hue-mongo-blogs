import { db } from "@/server/db";
import { BLOG_ENTRIES_COLLECTION, type BlogEntry } from "@/server/db/schema";
import { ObjectId } from "mongodb";

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
              {
                {
                  h1: <h1>{contentElement.content}</h1>,
                  h2: <h2>{contentElement.content}</h2>,
                  h3: <h3>{contentElement.content}</h3>,
                  h4: <h4>{contentElement.content}</h4>,
                  h5: <h5>{contentElement.content}</h5>,
                  h6: <h6>{contentElement.content}</h6>,
                  text: <p>{contentElement.content}</p>,
                  link: <a>{contentElement.content}</a>,
                  image: <img src={contentElement.content} />,
                }[contentElement.type]
              }
            </div>
          ))}
        </article>
      </main>
    </div>
  );
}
