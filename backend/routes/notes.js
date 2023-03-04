const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route 1: Get All the Notes using "/api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }
})

//Route 2: Add Notes using "/api/notes/addnote". Login required
router.post('/addnote', [body('title', 'title must be atleast 3 charackter long').isLength({ min: 3 }),
body('description', 'description must be atleast 5 character long').isLength({ min: 5 })], fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    //If there are error, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title, description, tag, user: req.user.id
    })

    try {
        //Create a new title
        const savedNote = await Notes.create(note)
        res.json(savedNote)
    }
    catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }
})

//Route 3: Update Notes using "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a new Note object
    const newNote = {};

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    try {
        //find the note to be updated and update it
        const note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found with this id") }
        //allow updation only if user own this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(updatedNote)
    } catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }

})

//Route 4: Delete Notes using "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
        const note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found with this id") }
        //allow deletion only if user own this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Succcess": "Note has been deleted", deleted_note: deletedNote })
    }
    catch (error) {
        res.status(500).send("Ineternal server error " + error);
    }
})


module.exports = router