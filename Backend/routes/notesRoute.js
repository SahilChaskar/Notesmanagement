const express = require('express');
const router = express.Router();
const { getNotes, createNote, editNotes, deleteNote } = require('../controller/notescontroller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/getnotes', isAuthenticated, getNotes);
router.post('/notes', isAuthenticated, createNote);
router.put('/getnotes:id', isAuthenticated, editNotes);
router.delete('/deletenote:id', isAuthenticated, deleteNote);

module.exports = router;
