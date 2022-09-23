import React, { useState } from 'react'
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const host = "http://localhost:7000";

    const [notes, setNotes] = useState([]);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/auth/fetchAllNotes`, {
            method: "GET",
            headers: {
                'authtoken': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a Note
    const addNote = async (tittle, description) => {
        // API Call
        const response = await fetch(`${host}/api/auth/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'authtoken': localStorage.getItem('token')
            },
            body: JSON.stringify({tittle,description})
        });
        const json = await response.json(); 
        console.log(json);
        setNotes(notes.concat(json));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        await fetch(`${host}/api/auth/deletenote/${id}`, {
            method: "DELETE",
            headers: { 
                'Content-Type': "application/json",
                'authtoken': localStorage.getItem('token')
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, tittle, description) => {
        // API Call  
        const response = await fetch(`${host}/api/auth/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'authtoken': localStorage.getItem('token')
            },
            body: JSON.stringify({tittle,description})
        });
      response.json();
        // // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].tittle = tittle;
                newNotes[index].description = description;
                break;
            }
        }  
        console.log(newNotes)
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;