import { useState } from "react";
import NoteContext from "./noteContext";

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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMmQzMzEyOGNjMzU4NjM2ZjljYjdmIn0sImlhdCI6MTY3ODAwNTYzOH0.BRYRu3Xgph_4kHRYwcXm7ySkQKgY8kKO1Zv6rvXLsTQ"
            }
        });

        const data = await response.json();
        setNotes(data);

    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //Todo Api call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMmQzMzEyOGNjMzU4NjM2ZjljYjdmIn0sImlhdCI6MTY3ODAwNTYzOH0.BRYRu3Xgph_4kHRYwcXm7ySkQKgY8kKO1Zv6rvXLsTQ"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const data = await response.json();

        console.log(data)

        const note = {
            "_id": "6402edb477e7bc66fd7b4666",
            "user": "6402d33128cc358636f9cb7f",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-03-04T07:05:24.754Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }
    //Delete a Note
    const deleteNote = async (id) => {
        //Todo Api call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMmQzMzEyOGNjMzU4NjM2ZjljYjdmIn0sImlhdCI6MTY3ODAwNTYzOH0.BRYRu3Xgph_4kHRYwcXm7ySkQKgY8kKO1Zv6rvXLsTQ"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMmQzMzEyOGNjMzU4NjM2ZjljYjdmIn0sImlhdCI6MTY3ODAwNTYzOH0.BRYRu3Xgph_4kHRYwcXm7ySkQKgY8kKO1Zv6rvXLsTQ"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;