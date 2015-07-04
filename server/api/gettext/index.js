'use strict';

var express = require('express');
var controller = require('./gettext.controller');

var router = express.Router();

router.get('/', controller.receive);

module.exports = router;