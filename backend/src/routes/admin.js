const router = require('express').Router();
const { getConfig } = require('../controllers/admin.controller');

router.get('/get-config', getConfig);

module.exports = router;
