import { auth } from "@/auth";
import Note from "@/components/Note";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

const NotePages = async ({ params }: { params: { title: string } }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const note = await prisma.note.findFirst({
    where: {
      AND: [
        {
          userId: user.id,
        },
        {
          slug: params.title,
        },
      ],
    },
  });

  if (!note)
    return (
      <main>
        <h1>Note not found</h1>
      </main>
    );

  return (
    <main>
      <Note note={note} />
    </main>
  );
};

export default NotePages;
