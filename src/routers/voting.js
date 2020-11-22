'use strict';

const Voting = require('../db/models/voting');
const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

//create voting
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.create'],
    queryParamsOrder: order['Voting.create']
  }
  await makeRequest(reqData);
});

// get specific voting
router.get('/:idVoting', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getInfo'],
    queryParamsOrder: order['Voting.getInfo'],
  };
  await makeRequest(reqData);
});

// get variants for specific voting
router.get('/:idVoting/variants', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getVariants'],
    queryParamsOrder: order['Voting.getVariants'],
  };
  await makeRequest(reqData);
});

// get all votings
router.get('/all', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getAll'],
    queryParamsOrder: order['Voting.getAll'],
  };
  await makeRequest(reqData);
});

// get current votings
router.get('/current', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getCurrent'],
    queryParamsOrder: order['Voting.getCurrent'],
  };
});

// get result
router.get('/:idVoting/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.result'],
    queryParamsOrder: order['Voting.resultDistrict'],
  };
  await makeRequest(reqData);
});

router.get('/:idVoting/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.resultDistrict'],
    queryParamsOrder: order['Voting.resultDistrict'],
  };
  await makeRequest(reqData);
});

module.exports = router;
