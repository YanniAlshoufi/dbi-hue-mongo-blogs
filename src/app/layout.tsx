import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { SelectOfCurrentUser } from "./_components/select-current-user";
import { db } from "@/server/db";
import { BLOG_USERS_COLLECTION, type BlogUser } from "@/server/db/schema";

export const metadata: Metadata = {
  title: "Web App",
  description: "Description here.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const collection = db.collection<BlogUser>(BLOG_USERS_COLLECTION);
  const currentUsers = await collection.find().toArray();

  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${geist.variable} dark from-background min-h-dvh bg-gradient-to-br to-gray-950 antialiased`}
        >
          <header className="bg-card flex h-16 items-center justify-end gap-4 p-4">
            <SelectOfCurrentUser
              possibleUsers={currentUsers.map((u) => ({
                id: u._id.toString(),
                username: u.username,
              }))}
            />
          </header>
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
