"use client";

import { deleteNoteAction, updateNoteAction } from "@/actions/noteActions";
import { redirectPath } from "@/actions/utilActions";
import { useRef, useState } from "react";
import { convertTitleToSlug } from "@/utils/utils";
import { redirect } from "next/navigation";

type Props = {
  note: {
    title: string;
    id: string;
    text: string;
    slug: string;
  };
};

const Note = ({ note }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <textarea
            name="text"
            id="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
          ></textarea>
          <button
            onClick={async () => {
              setIsEditing(false);
              await updateNoteAction(note.id, title, text);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
          <div>
            <button onClick={() => redirectPath("/notes")}>Back</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => dialogRef?.current?.showModal()}>
              Delete
            </button>
          </div>
          <dialog ref={dialogRef}>
            <h1>test</h1>
            <button onClick={() => dialogRef?.current?.close()}>Cancel</button>
            <button
              onClick={async () => {
                await deleteNoteAction(note.id);
                dialogRef?.current?.close();
              }}
            >
              Continue
            </button>
          </dialog>
        </>
      )}
    </>
  );
};

export default Note;
