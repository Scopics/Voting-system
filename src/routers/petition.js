'use strict';

const express = require('express');
const { 
  makeRequest, 
  authorizate, 
  processLimit, 
  makeRequestWithTotal, 
  makeQuery 
} = require('../db/resources');
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

// get current
router.get('/current', async (req, res) => {
  processLimit(req);
  const searchText = req.query.searchText;
  const query = searchText ? 
    queries['Petition.getCurrentBySearch'] : 
    queries['Petition.getCurrent']
  const totalQuery = searchText ? 
    queries['Petition.getCurrentBySearchSize'] : 
    queries['Petition.getCurrentSize'];
  const reqData = {
    req, res,
    query, totalQuery
  };
  makeRequestWithTotal(reqData)
});

// get all
router.get('/all', async (req, res) => {
  processLimit(req);
  const { searchText } = req.query;
  const query = searchText ? 
    queries['Petition.getAllBySearch'] : 
    queries['Petition.getAll'];
  const totalQuery = searchText ? 
    queries['Petition.getAllBySearchSize'] : 
    queries['Petition.getAllSize'];
  const reqData = {
    req, res,
    query, totalQuery
  };
  makeRequestWithTotal(reqData)
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

//get vote
router.get('/:petition_id/voteResult', async (req, res) => {
  console.log({ ...req.query, ...req.params });
  const reqData = {
    req, res,
    query: queries['Petition_results.getVote'],
    queryParamsOrder: order['Petition_results.getVote']
  };
  await makeRequest(reqData);
});

//vote for petition
router.post('/:petition_id/vote', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition_results.addVote'],
    queryParamsOrder: order['Petition_results.addVote']
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

// get result by all districts
router.get('/:petition_id/resultAllDistricts', async (req, res) => {
  const result = await makeQuery({
    query: queries['Petition.resultAllDistricts'],
    queryParams: [req.params.petition_id]
  });
  const resultByDistrict = [];
  result.forEach(district => resultByDistrict[district.district_id] = district);
  res.json(resultByDistrict);
});

//get result for petition in region
router.get('/:petition_id/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition.resultDistrict'],
    queryParamsOrder: order['Petition.resultDistrict'],
  };
  await makeRequest(reqData);
});


module.exports = router;
