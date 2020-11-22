'use strict';

const Falsification = require('../db/models/falsification');
const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();



// create
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Falsification.create'],
    queryParamsOrder: order['Falsification.create'],
  };
});

// get specific falsification
router.get('/:idFalsification', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Falsification.getInfo'],
    queryParamsOrder: order['Falsification.getInfo'],
  };
  await makeRequest(reqData);
});

// get all falsifications
router.get('/all', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Falsification.getAll'],
    queryParamsOrder: order['Falsification.getAll'],
  };
  await makeRequest(reqData);
});

module.exports = router;
