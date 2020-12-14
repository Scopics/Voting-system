'use strict';

const express = require('express');
const { makeRequest, authorizate, checkedRequest } = require('../db/resources');
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
  await makeRequest(reqData, true);
});

//login
router.post('/login', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.login'],
    queryParamsOrder: order['User.login'],
  };
  await makeRequest(reqData, true);
});

//update user status
router.put('/updateStatus', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.updateStatus'],
    queryParamsOrder: order['User.updateStatus']
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    const expectedStatus = 1;
    await checkedRequest(res, expectedStatus, userInfo.status, reqData);
  }
});

//get user profile
router.get('/:user_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['User.getInfo'],
    queryParamsOrder: order['User.getInfo'],
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    const expectedStatus = 0;
    await checkedRequest(res, expectedStatus, userInfo.status, reqData);
  }
});

module.exports = router;
