import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleOnClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ id: "", title: "", description: "", tag: "" })
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })

    }

    return (
        <div className='container'>
            <h2>Add a Note</h2>
            <Form className='my-3'>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id="title" value={note.title} name="title" placeholder="Enter title" onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" id="description" value={note.description} name="description" placeholder="Enter description" onChange={onChange}  />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="text" id="tag" value={note.tag} name="tag" placeholder="Enter tag" onChange={onChange}  />
                </Form.Group>
                <Button disabled={note.title.length < 5 || note.description.length < 5} variant="primary" type="submit" onClick={handleOnClick}>
                    Add Note
                </Button>
            </Form>
        </div>
    )
}

export default AddNote
