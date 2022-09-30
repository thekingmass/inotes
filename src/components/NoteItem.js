import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";


const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}= context;
  const { note } = props;

  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <h5 className="card-title">{note.title}
            </h5>
            <i className="fa-solid fa-pen-to-square mx-2" style={{color:"green"}}></i>
            {/* fontawesome edit icon */}
            <i className="fa-solid fa-trash-can mx-2" style={{color:"red"}} onClick={()=>{deleteNote(note._id)}}></i>
            {/* fontawesome delte icon */}
          </div>
          <hr />
          <p className="card-text">{note.description} </p>
        </div>
        <div className="card-footer">
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
