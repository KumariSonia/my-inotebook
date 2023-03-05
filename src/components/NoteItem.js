import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;

    const { _id , user, title, description, tag, date } = props.note;
    return (
        <div className='col-md-3'>
            <Card className='card my-3'>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(_id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
