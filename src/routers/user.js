'use strict';

const User = require('../db/models/user');
const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

// register
router.post('/register', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.login'],
    queryParamsOrder: order['User.login'],
  };
  await makeRequest(reqData);
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

router.put('/updateStatus', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.updateStatus'],
    queryParamsOrder: order['User.updateStatus']
  };
  await makeRequest(reqData);
});

module.exports = router;
