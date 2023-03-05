import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    useEffect(() => {
        getAllNotes()
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
    }

    const ref = useRef(null)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })

    }

    const handleOnClick = (event) => {
        event.preventDefault();
        editNote(note.id,note.title, note.description, note.tag);
        setShow(false)
    }

    return (
        <>
            <AddNote />

            {/* modal started */}
            <Button ref={ref} variant="primary" className='d-none' onClick={handleShow}>
                Edit Note
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='my-3'>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={note.title} type="text" id="title" name="title" placeholder="Enter title" onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={note.description} id="description" name="description" placeholder="Enter description" onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Tag</Form.Label>
                            <Form.Control type="text" value={note.tag} id="tag" name="tag" placeholder="Enter tag" onChange={onChange} />
                        </Form.Group>
                        {/* <Button variant="primary" type="submit" onClick={handleOnClick}>
                    Add Note
                </Button> */}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOnClick}>
                        UpdateNote
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* modal ended */}
            <div className='row my-3'>
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
