const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')




//create routes
router.post('/createpost', requireLogin, (req, res) => {
  const { title, body } = req.body
  if (!title || !body) {
    res.status(422).json({ error: "please add all fields" })
  }
  const post = new post({
    title,
    body
  })
})

module.exports = router

