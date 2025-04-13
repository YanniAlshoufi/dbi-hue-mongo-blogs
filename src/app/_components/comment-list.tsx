"use client";

import { api } from "@/trpc/react";

type CommentListProps = {
  blogId: string;
};

export default function CommentList({ blogId }: CommentListProps) {
  const { data: comments } = api.blogs.getComments.useQuery({ blogId });

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
