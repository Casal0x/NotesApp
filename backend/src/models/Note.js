const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = model('Note', noteSchema);
