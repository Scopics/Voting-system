'use strict';

const express = require('express');
const { makeRequest, authorizate, checkedRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

//create voting
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.create'],
    queryParamsOrder: order['Voting.create']
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    const expectedStatus = 1;
    await checkedRequest(res, expectedStatus, userInfo.status, reqData);
  }
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
  await makeRequest(reqData);
});

// get variants for specific voting
router.get('/:voting_id/variants', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getVariants'],
    queryParamsOrder: order['Voting.getVariants'],
  };
  await makeRequest(reqData);
});

// get result general
router.get('/:voting_id/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.result'],
    queryParamsOrder: order['Voting.resultDistrict'],
  };
  await makeRequest(reqData);
});

// get result by district
router.get('/:voting_id/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.resultDistrict'],
    queryParamsOrder: order['Voting.resultDistrict'],
  };
  await makeRequest(reqData);
});

//vote
router.post('/:voting_id/vote', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting_results.addVote'],
    queryParamsOrder: order['Voting_results.addVote']
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    await makeRequest(reqData);
  }
});

// get specific voting
router.get('/:voting_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getInfo'],
    queryParamsOrder: order['Voting.getInfo'],
  };
  await makeRequest(reqData);
});

module.exports = router;
