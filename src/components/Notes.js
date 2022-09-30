import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes} = context;
  useEffect(() => {
    getNotes()
  }, [])
  
  return (
    <>
    <AddNote/>
      <div className="container">
        <div className="row">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
