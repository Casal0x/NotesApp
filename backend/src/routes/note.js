const router = require('express').Router();
const TokenValidation = require('../libs/TokenValidation');
const {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
} = require('../controllers/note.controller');

router.post('/create-note', TokenValidation, createNote);
router.put('/update-note', TokenValidation, updateNote);
router.delete('/delete-note', TokenValidation, deleteNote);
router.get('/get-notes', TokenValidation, getNotes);

module.exports = router;
