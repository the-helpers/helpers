"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const router     = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use('/', express.static('public'));
router.use('/js', express.static('dist'));

router.post('/ask', function (req, res) {
  if (req.body.question) {
    console.log('Received a new question: ' + req.body.question);
    // handle res.body.question
  }
});

module.exports = router;
