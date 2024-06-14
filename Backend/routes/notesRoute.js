const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('../controller/notescontroller');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/getnotes', isAuthenticated, getNotes);
router.post('/notes', isAuthenticated, createNote);

module.exports = router;
