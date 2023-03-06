import { useState } from "react";
import NoteContext from "./noteContext";
import React from 'react'

const NoteState = (props) => {
    const host = "http://localhost:8080"
    // const notesInitial = []
    const [notes, setNotes] = useState([])

    //Get all Notes
    const getAllNotes = async () => {
        //Api call to fetch all notes
        const url = `${host}/api/notes/fetchAllNotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const data = await response.json();
        setNotes(data);

    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //Api call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        setNotes(notes.concat(data));
    }
    //Delete a Note
    const deleteNote = async (id) => {
        //Todo Api call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data)

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)
        let newNote = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;