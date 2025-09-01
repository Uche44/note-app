// const getNotes = () => {
//   //   api
//   //     .get("/api/notes/")
//   //     .then((res) => res.data)
//   //     .then((data) => {
//   //       setNotes(data);
//   //       console.log(data);
//   //     })
//   //     .catch((error) => console.log(error));
//   // };

import { useState, useEffect } from "react";
import api from "../api";
import { createNote } from "../lib/createNote";
import { deleteNote } from "../lib/deleteNote";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    await createNote(e, setContent, setTitle, getNotes, content, title);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id, getNotes); 
  };

  return (
    <div className="home-container">
      <h1 className="title">My Notes</h1>

      <form
        className="note-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <div
              className="note-card"
              key={note.id}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
