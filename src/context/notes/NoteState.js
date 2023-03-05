import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6402d423f1a191e084123fe0",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note1",
            "description": "Note1 Description",
            "tag": "note1 tag",
            "date": "2023-03-04T05:16:19.455Z",
            "__v": 0
        },
        {
            "_id": "6402edb477e7bc66fd7b4266",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note2",
            "description": "Note2 Description",
            "tag": "note2 tag",
            "date": "2023-03-04T07:05:24.754Z",
            "__v": 0
        },
        {
            "_id": "6402d423f1a191e084123fe0",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note3",
            "description": "Note3 Description",
            "tag": "note3 tag",
            "date": "2023-03-04T05:16:19.455Z",
            "__v": 0
        },
        {
            "_id": "6402edb477e7bc66fd7b4266",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note4",
            "description": "Note4 Description",
            "tag": "note4 tag",
            "date": "2023-03-04T07:05:24.754Z",
            "__v": 0
        },
        {
            "_id": "6402d423f1a191e084123fe0",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note5",
            "description": "Note5 Description",
            "tag": "note5 tag",
            "date": "2023-03-04T05:16:19.455Z",
            "__v": 0
        },
        {
            "_id": "6402edb477e7bc66fd7b4266",
            "user": "6402d33128cc358636f9cb7f",
            "title": "Note6",
            "description": "Note6 Description",
            "tag": "note6 tag",
            "date": "2023-03-04T07:05:24.754Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;