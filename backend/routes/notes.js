const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes of a logged user using GET "/api/notes/fetchallnotes" . login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Get all the notes of a logged user using GET "/api/notes/addnote" . login Required
router.post("/addnote", fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description should be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
        const { title, description, tag } = req.body;

      // If there are errors return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing note of a logged in user using PUT "/api/notes/updatenote" . login Required

router.put("/updatenote/:id", fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description should be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
        // If there are errors return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      // create a newNote object
      const newNote = {};

      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id); // the param.id is the id which is comming from parameter

      if(!note){return res.status(404).send("Not Found")} //  If no note is found with the id

      if(note.user.toString() !== req.user.id){ // if the user does not belongs to this particula note
        return res.status(401).send("Not Allowed");
      }

      //updating the note 
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
      res.json(note);


    }
    catch{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 4: Delete an existing note of a logged in user using DELETE "/api/notes/deletenote" . login Required

router.delete("/deletenote/:id", fetchuser,
  async (req, res) => {
    try {
      // If there are errors return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
     
      // Find the note to be deleted and delete it
      let note = await Note.findById(req.params.id); // the param.id is the id which is comming from parameter

      if(!note){return res.status(404).send("Not Found")} //  If no note is found with the id

      // Allow deletion only if user and delete it
      if(note.user.toString() !== req.user.id){ // if the user does not belongs to this particular note
        return res.status(401).send("Not Allowed");
      }

      //updating the note 
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Note has been deleted", note:note });
    }
    catch{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
