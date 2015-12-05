"use strict";

const express  = require('express');
const router   = express.Router();

router.use('/', express.static('public'));
router.use('/js', express.static('dist'));

module.exports = router;
