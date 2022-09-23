// const express = require("express")
// const router = express.Router();
// const User = require('../models/User');
// var fetchuser = require("../middleware/fetchuser")
// const Notes = require("../models/Notes")
// const { body, validationResult } = require('express-validator');

// //notes ka code bhi yhi likh rha 
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     // console.log("I am working")  
//     try {
//         const notes = await Notes.find({ user: req.user.id })
//         res.json(notes)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Some INternal Server error")
//     }
// })

// //add a new note using post post /addnote login required
// router.post('/addnote', fetchuser, [
//     body('tittle', 'Enter Valid tittle').isLength({ min: 3 }), //adding validation
//     body(' description', 'Please enter a valid Description').isLength({ min: 3 }),
// ], async (req, res) => {
//     try {
//         console.log("working")  
//         const { tittle, description, tag } = req.body;
//         // console.log("I am working")
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const note = new Notes({
//             tittle, description, tag, user: req.user.id
//         })
//         const savedNote = await note.save();
//         res.json(savedNote)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Some INternal Server error")
//     }

// })
// module.exports = router