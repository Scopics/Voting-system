'use strict';

const express = require('express');
const { makeRequest, authorizate } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

// create
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.create'],
    queryParamsOrder: order['Petition.create'],
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    await makeRequest(reqData);
  }
});

router.get('/current', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.getCurrent'],
    queryParamsOrder: order['Petition.getCurrent'],
  };
  await makeRequest(reqData);
});

// get all
router.get('/all', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.getAll'],
    queryParamsOrder: order['Petition.getAll']
  };
  await makeRequest(reqData);
});

//get info for petition
router.get('/:petition_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.getInfo'],
    queryParamsOrder: order['Petition.getInfo']
  };
  await makeRequest(reqData);
});

//vote for petition
router.get('/:petition_id/vote', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition_result.addVote'],
    queryParamsOrder: order['Petition_result.addVote']
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    await makeRequest(reqData);
  }
});

// get result
router.get('/:petition_id/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.result'],
    queryParamsOrder: order['Petition.result'],
  };
  await makeRequest(reqData);
});

//get result for petition in region
router.get('/:petition_id/resultRegion', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.resultRegion'],
    queryParamsOrder: order['Petition.resultRegion'],
  };
  await makeRequest(reqData);
});

router.get('/:petition_id/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.resultDistrict'],
    queryParamsOrder: order['Petition.resultDistrict'],
  };
  await makeRequest(reqData);
});


module.exports = router;
