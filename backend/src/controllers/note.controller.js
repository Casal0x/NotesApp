const { SUCCESS, ERROR } = require('../constants/response.constants');

//Model
const Note = require('../models/Note');

const noteCtrl = {};

noteCtrl.createNote = async (req, res) => {
  const { _id } = req;
  const { title, note } = req.body;

  const newNote = new Note({
    title,
    note,
    user_id: _id,
  });

  try {
    const savedNote = await newNote.save();
    const notes = await Note.find({ user_id: _id });

    res.json({
      status: SUCCESS,
      notes,
      lastNote: savedNote,
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

noteCtrl.updateNote = async (req, res) => {
  const { _id } = req.body;

  try {
    await Note.replaceOne(
      { _id },
      { ...req.body, updatedAt: new Date().toLocaleString() }
    );

    res.json({
      status: SUCCESS,
      message: 'Note Updated',
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

noteCtrl.deleteNote = async (req, res) => {
  const { _id } = req.body;
  try {
    const note = await Note.findOne({ _id });
    if (!note) {
      return res.json({
        status: ERROR,
        message: "Note doesn't exist",
      });
    }
    await note.remove();

    res.json({
      status: SUCCESS,
      message: 'Note removed successfuly',
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

noteCtrl.getNotes = async (req, res) => {
  const { _id } = req;

  try {
    const notes = await Note.find({ user_id: _id });

    res.json({
      status: SUCCESS,
      notes,
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

module.exports = noteCtrl;
