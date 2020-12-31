'use strict';

const express = require('express');
const { makeRequest, authorizate, processLimit } = require('../db/resources');
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
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    await makeRequest(reqData);
  }
});

// get all falsifications
router.get('/all', async (req, res) => {
  processLimit(req);
  const searchText = req.query.searchText;
  const query = searchText ? 
    queries['Falsification.getAllBySearch'] : queries['Falsification.getAll']
  const queryParamsOrder = searchText ? 
    order['Falsification.getAllBySearch'] : order['Falsification.getAll']
  const reqData = {
    req, res,
    query,
    queryParamsOrder,
  };
  await makeRequest(reqData);
});

// get info about specific falsification
router.get('/:falsification_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Falsification.getInfo'],
    queryParamsOrder: order['Falsification.getInfo'],
  };
  await makeRequest(reqData);
});

module.exports = router;
