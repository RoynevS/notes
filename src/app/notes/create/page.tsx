import { createNoteAction } from "@/actions/noteActions";

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
    </main>
  );
};

export default CreateNotePage;
