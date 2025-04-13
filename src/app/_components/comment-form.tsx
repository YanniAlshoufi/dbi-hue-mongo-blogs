"use client";

import { useState } from "react";
import {api} from "@/trpc/react";

export default function CommentForm({ blogId }: { blogId: string }) {
    const [text, setText] = useState("");
    const utils = api.useContext();

    const addComment = api.blogs.addComment.useMutation({
        onSuccess: () => {
            setText("");
            utils.blogs.getComments.invalidate({ blogId });
        },
    });

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
