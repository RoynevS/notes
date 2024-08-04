"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

const createNoteAction = async (formData: FormData) => {
  const session = await auth();
  const user = session?.user;
  const title = formData.get("title") as string;
  const text = formData.get("text") as string;

  if (!user) {
    throw new Error("not authorized");
  }

  await prisma.note.create({
    data: {
      title,
      text,
      userId: user.id as string,
    },
  });
  redirect("/notes");
};

export { createNoteAction };
