const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

//Routes
const auth = require('./routes/auth');
const note = require('./routes/note');

app.use('/auth', auth);
app.use('/notes', note);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(err);
    console.log('Mongo DB Connected');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
);
