'use strict';

const User = require('../db/models/user');
const express = require('express');
const router = express.Router();



// register
router.post('/register', async (req, res) => {
  try {
    const { name, surname, birthday_date, gender, district_id, email, password, status } = req.body;
    const result = User.register(name, surname, birthday_date, gender, district_id, email, password, status);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = User.login(email, password);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
