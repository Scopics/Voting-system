'use strict';

const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

// register
router.post('/register', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.register'],
    queryParamsOrder: order['User.register'],
  };
  await makeRequest(reqData);
});

router.post('/login', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.login'],
    queryParamsOrder: order['User.login'],
  };
  await makeRequest(reqData);
});

router.put('/updateStatus', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.updateStatus'],
    queryParamsOrder: order['User.updateStatus']
  };
  await makeRequest(reqData);
});

router.get('/:user_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.getInfo'],
    queryParamsOrder: order['User.getInfo'],
  };
  await makeRequest(reqData);
});

module.exports = router;
