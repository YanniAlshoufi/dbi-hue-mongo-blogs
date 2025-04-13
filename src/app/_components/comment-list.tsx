"use client";

import { api } from "@/trpc/react";

export default function CommentList({
  blogId,
}: {
  blogId: string | undefined;
}) {
  if (!blogId) {
    return null;
  }
  const { data: comments, isLoading } = api.blogs.getComments.useQuery(
    { blogId },
    { enabled: !!blogId },
  );

  if (isLoading) return <p>Lade Kommentare...</p>;
  if (!comments || comments.length === 0) {
    return <p>Noch keine Kommentare vorhanden.</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id?.toString()} className="rounded border p-3">
          <p>{comment.text}</p>
          <span>{new Date(comment.creationDate).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
