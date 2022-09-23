import React, { useState, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import NoteContext from "../context/notes/NoteContext";

function CreateArea() {

    const context = useContext(NoteContext);

    const {addNote} = context;

    const [isExpended, setExpended] = useState(false);

    const [note, setNote] = useState({
       tittle: "",
       description: "" 
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setNote (prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }

    function submitNote(event) {
        addNote(note.tittle, note.description);
        setNote({
          tittle: "",
          description: ""
        })
        event.preventDefault();
    }

    function expand() {
      setExpended(true);
    }

  return (
    <div>
      <form className="create-note">
        {
          isExpended && 
          <input 
              onChange={handleChange}
              name="tittle" 
              placeholder="tittle" 
              value={note.tittle} 
              minLength={3}
              required
          />
        }
        <textarea 
            onClick={expand}
            onChange={handleChange}
            name="description" 
            placeholder="Take a note..." 
            value={note.description} 
            rows={isExpended ? 3 : 1} 
            minLength={5}
            required
        />
        <Zoom in={isExpended}>
            <Fab  className="fab" onClick={submitNote} disabled={note.tittle.length < 3 || note.description.length < 5}>
              <AddIcon />
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
