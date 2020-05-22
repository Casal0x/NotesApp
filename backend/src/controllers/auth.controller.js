const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { SUCCESS, ERROR } = require('../constants/response.constants');
const { TRANSPORTER_OPTIONS } = require('../constants/mail.constants');

const SECRET_KEY = process.env.SECRET_KEY || 'secrettoken';
const WEBSITE = 'http://localhost:8000/auth/reset-password/';

//Model
const User = require('../models/User');

// const transporter = nodemailer.createTransport(process.env.SMTP_GMAIL);
const transporter = nodemailer.createTransport(TRANSPORTER_OPTIONS);

const authCtrl = {};

authCtrl.signUp = async (req, res) => {
  const { email, username, password, name, lastname } = req.body;
  const user = new User({
    email,
    username,
    password,
    name,
    lastname,
  });

  try {
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    savedUser.password = undefined;

    const activationToken = await jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    const message = `
      <h1>Note App</h1>
      <h3> Activate your account! </h3>
      <a href="${WEBSITE}${activationToken}" target="_blank"> Click HERE! </a>
    `;

    const mailOptions = {
      from: 'Notes App <dontreply@casalox.com>',
      to: email,
      subject: 'Notes App: account activation',
      html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) console.log(error), console.log(info.response);
    });

    res.json({
      status: SUCCESS,
      user: savedUser,
      activationToken,
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

authCtrl.signIn = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username && !email) {
    return res.json({
      status: ERROR,
      message: 'Username or Email required',
    });
  }

  let user;
  if (username) user = await User.findOne({ username });
  else user = await User.findOne({ email });

  if (!user) {
    return res.json({
      status: ERROR,
      message: 'User not registered',
    });
  }

  if (!user.status) {
    return res.json({
      status: ERROR,
      message: 'User inactive',
    });
  }

  const correctPassword = await user.validatePassword(password);
  if (!correctPassword) {
    return res.json({
      status: ERROR,
      message: 'Username/Email or Password incorrect',
    });
  }

  const token = await jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: '1h', //60 * 60 * 24
  });

  res.json({
    status: SUCCESS,
    token,
  });
};

authCtrl.restorePassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.json({
      status: ERROR,
      message: 'User not found.',
    });
  }

  const restoreToken = jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: '1d',
  });

  user.restoreToken = restoreToken;
  await user.save();

  const message = `
    <h1>Note App</h1>
    <h3> Restore password link </h3>
    <a href="${WEBSITE}${restoreToken}" target="_blank"> Click HERE! </a>
  `;

  const mailOptions = {
    from: 'no reply <dontreply@casalox.com>',
    to: email,
    subject: 'Notes App: password restore link',
    html: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error), console.log(info.response);
  });

  res.json({
    status: SUCCESS,
    message: 'email sended',
    restoreToken,
  });
};

authCtrl.resetPassword = async (req, res) => {
  const { password, matchPassword } = req.body;
  const token = req.header('auth-token');

  if (password !== matchPassword) {
    return res.json({
      status: ERROR,
      message: "Password doesn't match",
    });
  }

  try {
    const { _id } = req;
    const user = await User.findOne({ _id });

    if (token !== user.restoreToken) {
      return res.json({
        status: ERROR,
        message: 'Token invalid',
      });
    }

    user.password = await user.encryptPassword(password);
    user.restoreToken = '';

    await user.save();

    res.json({
      status: SUCCESS,
      message: 'Password reseted!',
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

authCtrl.changePassword = async (req, res) => {
  const { _id } = req;
  const { oldPassword, password, matchPassword } = req.body;

  if (password !== matchPassword) {
    return res.json({
      status: ERROR,
      message: "Password's don't match!",
    });
  }

  if (oldPassword === password) {
    return res.json({
      status: ERROR,
      message: 'Old Password and New Password are the same.',
    });
  }

  const user = await User.findOne({ _id });

  if (!user) {
    return res.json({
      status: ERROR,
      message: "User doesn't exist",
    });
  }

  const correctPassword = await user.validatePassword(oldPassword);

  if (!correctPassword) {
    return res.json({
      status: ERROR,
      message: 'Old Password provided is incorrect!',
    });
  }

  user.password = await user.encryptPassword(password);

  await user.save();

  res.json({
    status: SUCCESS,
    message: 'Password updated successfully!',
  });
};

authCtrl.profile = async (req, res) => {
  const { _id } = req;
  const user = await User.findOne({ _id }, { password: 0 });

  res.json({
    status: SUCCESS,
    user,
  });
};

authCtrl.updateProfile = async (req, res) => {
  const { _id } = req;
  try {
    await User.updateOne({ _id }, req.body);
    const user = await User.findOne({ _id }, { password: 0 });

    res.json({
      status: SUCCESS,
      msg: 'Profile Updated',
      user,
    });
  } catch (error) {
    res.json({
      status: ERROR,
      msg: "Couldn't update the profile",
      error,
    });
  }
};

authCtrl.activateUser = async (req, res) => {
  const { _id } = req;

  try {
    await User.updateOne({ _id }, { status: 1 });

    res.json({
      status: SUCCESS,
      message: 'User activated',
    });
  } catch (error) {
    res.json({
      status: ERROR,
      error,
    });
  }
};

module.exports = authCtrl;
