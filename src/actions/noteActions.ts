"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { convertTitleToSlug } from "@/utils/utils";
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
      slug: `${convertTitleToSlug(title)}`,
      userId: user.id as string,
    },
  });
  redirect("/notes");
};

const deleteNoteAction = async (id: string) => {
  await prisma.note.delete({
    where: {
      id,
    },
  });
  redirect("/notes");
};

const updateNoteAction = async (id: string, title: string, text: string) => {
  const slug = convertTitleToSlug(title);
  await prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      text,
      slug,
    },
  });
  redirect(`/notes/${slug}`);
};

export { createNoteAction, deleteNoteAction, updateNoteAction };
