"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function CommentForm({
  blogId,
}: {
  blogId: string | undefined;
}) {
  const [text, setText] = useState("");
  const utils = api.useContext();

  const addComment = api.blogs.addComment.useMutation({
    onSuccess: () => {
      setText("");
      if (blogId) {
        utils.blogs.getComments.invalidate({ blogId });
      }
    },
  });

  if (!blogId) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim()) addComment.mutate({ blogId, text });
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kommentar schreiben..."
      />
      <button type="submit">Senden</button>
    </form>
  );
}
