const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const ShortUrl = require('./../models/shortUrl');
const app = express();

// Welcome Page
router.get('/', forwardAuthenticated, async (req, res) =>
  res.render('welcome')
);

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const shortUrls = await ShortUrl.find({ user: req.user.email });

  res.render('index', {
    shortUrls: shortUrls,
    alreadyExists: false,
    user: req.user.name,
  });
});

router.post('/shortUrls', ensureAuthenticated, async (req, res) => {
  const url = await ShortUrl.findOne({
    full: req.body.fullurl,
    user: req.user.email,
  });
  if (url) {
    const shortUrls = await ShortUrl.find({ user: req.user.email });
    res.render('index', {
      shortUrls: shortUrls,
      alreadyExists: true,
      user: req.user.name,
    });
  } else {
    await ShortUrl.create({ full: req.body.fullurl, user: req.user.email });
    res.redirect('/');
  }
});
router.post('/clear', ensureAuthenticated, async (req, res) => {
  await ShortUrl.deleteMany({ user: req.user.email });
  res.redirect('/');
});

router.get('/:shortUrl', ensureAuthenticated, async (req, res) => {
  const shortUrl = await ShortUrl.findOne({
    short: req.params.shortUrl,
    user: req.user.email,
  });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

module.exports = router;
