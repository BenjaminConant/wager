'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email',
    		'user_about_me',
    		'user_location',
    		'user_likes',
    		'user_hometown',
    		'user_education_history',
    		'user_birthday',
    		'user_friends',
    		  ],
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;