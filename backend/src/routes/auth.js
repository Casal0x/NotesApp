const router = require('express').Router();
const TokenValidation = require('../libs/TokenValidation');
const {
  signUp,
  signIn,
  profile,
  updateProfile,
  changePassword,
  restorePassword,
  resetPassword,
} = require('../controllers/auth.controller');

router.get('/restore-password', restorePassword);
router.get('/profile', TokenValidation, profile);

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/reset-password/', TokenValidation, resetPassword);

router.put('/update-profile', TokenValidation, updateProfile);
router.put('/change-password', TokenValidation, changePassword);

module.exports = router;
