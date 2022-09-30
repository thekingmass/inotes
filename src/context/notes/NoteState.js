import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [  ];

  const [notes, setNotes] = useState(notesInitial);


  // FETCH ALL NOTES

  const getNotes =async () => {
    
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyYWJmM2E4NmUzNDExZmJmOGJjMTg5In0sImlhdCI6MTY2Mzc1MjYyNn0.ed-t4z-x6ISrlOnGlWPH50zrDtkMHi1jW8Shxk87ZVc",
      }
    });
    
    // fetch notes
    const resjson = await response.json()
    console.log(resjson);
    setNotes(resjson);
    
 
  };
  
  const addNote =async (title, description, tag) => {
    
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyYWJmM2E4NmUzNDExZmJmOGJjMTg5In0sImlhdCI6MTY2Mzc1MjYyNn0.ed-t4z-x6ISrlOnGlWPH50zrDtkMHi1jW8Shxk87ZVc",
      },
      body: JSON.stringify({title, description, tag}),
    });
    
    // Add a note
    console.log("Adding a new note");
    const note = {
      _id: "632b5a73ce3042d871a27bs98b",
      user: "632abf3a86e3411fbf8bc189",
      title: title,
      description: description,
      tag: tag,
      date: "2022-09-21T18:39:47.999Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //  Delete a Note

  const deleteNote = (id) => {
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyYWJmM2E4NmUzNDExZmJmOGJjMTg5In0sImlhdCI6MTY2Mzc1MjYyNn0.ed-t4z-x6ISrlOnGlWPH50zrDtkMHi1jW8Shxk87ZVc",
      },
      body: JSON.stringify({title, description, tag}),
    });

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
