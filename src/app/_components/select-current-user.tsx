"use client";

import { Select, SelectItem } from "@/components/ui/select";
import { useUserStore } from "./user-store";

export function SelectOfCurrentUser(props: {
  possibleUsers: { id: string; username: string }[];
}) {
  const userStore = useUserStore();

  return (
    <Select
      value={userStore.currentUser?.id}
      onValueChange={(v) =>
        userStore.setCurrentUser(
          props.possibleUsers.filter((u) => u.id === v)[0]!,
        )
      }
    >
      {props.possibleUsers.map((user) => (
        <SelectItem value={user.id}>{user.username}</SelectItem>
      ))}
    </Select>
  );
}
