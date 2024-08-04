import { auth } from "@/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const NotesPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const notes = await prisma.note.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <main>
      <Link href="/notes/create">Create Note</Link>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default NotesPage;
