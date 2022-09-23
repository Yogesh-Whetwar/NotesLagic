import React, {useContext} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NoteContext from '../context/notes/NoteContext';

function Note(props) {

  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const {noteItem, updateNote} = props;

    function handleDelete() {
      deleteNote(noteItem._id);
    }

    function handleEdit() {
      updateNote(noteItem);
    }

  return (
    <div className="note">
      <h1>{noteItem.tittle}</h1>
      <p>{noteItem.description}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit} data-bs-toggle="modal" data-bs-target="#exampleModal">
        {/* <EditIcon /> */}
      </button>
    </div>
  );
}

export default Note;
