import { createNoteAction } from "@/actions/noteActions";
import { redirect } from "next/navigation";

const CreateNotePage = () => {
  return (
    <main>
      <h1>Create new Note</h1>
      <form action={createNoteAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea name="text" id="text"></textarea>
        </div>
        <button type="submit">Create Note</button>
      </form>
      <form
        action={async () => {
          "use server";
          redirect("/notes");
        }}
      >
        <button>Cancel</button>
      </form>
    </main>
  );
};

export default CreateNotePage;
