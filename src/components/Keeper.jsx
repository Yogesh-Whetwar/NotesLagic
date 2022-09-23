import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Note from './Note';
import CreateArea from './CreateArea';
import NoteContext from '../context/notes/NoteContext';
const Keeper = () => {

  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/login');
    }
  })

  const [note, setNote] = useState({id: "",tittle: "", description: ""});

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      tittle: currentNote.tittle,
      description: currentNote.description
    });    
  }
    function Click (e){ 
      editNote(note.id, note.tittle, note.description);
    // console.log(note);
  }

  return ( 
    <div>
     
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-description">
            <div className="modal-header">
              <h5 className="modal-tittle" id="exampleModalLabel">Edit Note from here</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="tittle" className="form-label">Title</label> 
                <input type="text" className="form-control" id="tittle" name="tittle" value={note.tittle} onChange={onChange} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Content</label>
                 {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />  */}
                <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type='button' className="btn btn-primary" data-bs-dismiss="modal" onClick={Click} disabled={note.tittle.length < 3 || note.description.length < 5}>update note</button>
            </div>
          </div>
        </div>
      </div>

      <CreateArea/>
      {notes.map((noteItem, index) => {
        return <Note
          key={index}
          noteItem={noteItem}
          updateNote={updateNote}
        />
      })}
    </div>
  )
    }

export default Keeper;
