const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : get all the notes : GET "/api/notes/login" No login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

// ROUTE 2 : Add a new notes : post "/api/notes/addnote" No login require
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // if there are errors ,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }




})

// ROUTE 3 : update and existing notes : put "/api/notes/updatenote" No login require

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
try {
     // create a new not object

     const newNote = {};
     if (title) { newNote.title = title };
     if (description) { newNote.description = description };
     if (tag) { newNote.tag = tag };
 
     // find the note to be updated and update it
 
     let note =await Note.findById(req.params.id)
     if (!note) { return res.status(404).send("Not Found") }
 
     if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
     }
 
     note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
   
})

// ROUTE 4 : Delete and existing notes using: Delete "/api/notes/deletenote" No login require

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
     // find the note to be delete and delete it

     let note =await Note.findById(req.params.id)
     if (!note) { return res.status(404).send("Not Found") }
 
     // Allow delete only if user owns this Note
     if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
     }
 
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Sucess": "Notes has been deleted",note:note});
   } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error");
   }
   
})

module.exports = router;