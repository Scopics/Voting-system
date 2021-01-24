'use strict';

const express = require('express');
const { 
  makeRequest, 
  authorizate, 
  checkedRequest, 
  tokenDecoder, 
  makeQuery, 
  tokenGenerator 
} = require('../db/resources');
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
  await makeRequest(reqData, { authentification: true });
});

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.query;
  const query = queries['User.login'];
  const queryParams = [email, password];
  const queryData = { query, queryParams };
  const result = await makeQuery(queryData);

  if (result.length === 0) {
    res.status(401).send('Немає користувачів з таким логіном і паролем');
  } else {
    const token = tokenGenerator(email, password);
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  }
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

//get data via token
router.get('/token', async (req, res) => {
  const token = req.query.token || '';
  const decodedData = tokenDecoder(token);
  const { email } = decodedData;
  const queryData = {
    query: `SELECT user_id, name, surname, birthday_date, gender, district_id,
     email, status FROM users WHERE users.email = $1`,
    queryParams: [email]
  };
  const result = await makeQuery(queryData);
  res.json(result[0]);
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
