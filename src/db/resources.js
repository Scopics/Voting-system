'use strict';
const pool = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function processLimit(req) {
  let { limit, offset } = req.query;
  const maxLimit = 10, defaultOffset = 0;
  offset = offset || defaultOffset;
  if (limit) limit = Math.min(limit, maxLimit);
  else limit = maxLimit;
  req.query.limit = limit;
  req.query.offset = offset;
}

function getQueryParamsArr(queryParams, queryParamsOrder) {
  if (!queryParamsOrder)
    return Object.values(queryParams);
  const queryParamsArr = [];
  queryParamsOrder.forEach(key => queryParamsArr.push(queryParams[key]));
  return queryParamsArr;
}

const checkMissingArg = args => 
  args.some(item => {
    const condition1 = typeof item == 'undefined';
    const condition2 = typeof item != 'undefined' && !`${item}`.length;
    return (condition1 || condition2);
  })

async function makeRequest(reqData, config = {}) {
  const { req, res, query, queryParamsOrder } = reqData;
  const { authentification } = config;
  const reqParams = req.params;
  const reqQuery = req.query;
  const queryParamsUnordered = { ...reqQuery, ...reqParams };

  const queryParamsOrdered =
    getQueryParamsArr(queryParamsUnordered, queryParamsOrder);

  //check if fields are empty
  if (checkMissingArg(queryParamsOrdered)) {
    res.status(400).send('Empty fields are not allowed');
    return;
  }

  const queryData = {
    queryParams: queryParamsOrdered,
    query
  };

  try {
    if (authentification) {
      const { email, password } = queryParamsUnordered;
      const token = tokenGenerator(email, password);
      await makeQuery(queryData);
      res.cookie('token', token, { httpOnly: true });
      res.json({ token });
    } else {
      const result = await makeQuery(queryData);
      res.json(result);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send('Error in query to db.');
  }
}

async function makeRequestWithTotal(reqData) {
  const {
    req, res, query, totalQuery
  } = reqData;
  const { limit, offset, searchText } = req.query;
  const queryParams = searchText ? 
    [limit || 10, offset || 0, searchText] : 
    [limit || 10, offset || 0];
  const queryData = {
    queryParams, query
  }
  const result = await makeQuery(queryData);

  const reqTotalData = {
    queryParams: [],
    query: totalQuery
  }
  const total = await makeQuery(reqTotalData);

  res.json({ 
    result, 
    count: total[0].count 
  })
}

async function makeQuery(queryData) {
  const { queryParams, query } = queryData;
  const result = await pool.query(query, queryParams);
  return result.rows;
}

function tokenGenerator(email, password) {
  const payload = {
    email,
    password
  };
  return jwt.sign(payload, process.env.JWTSECRET);
}

const tokenDecoder = token => jwt.decode(token);

const checkedRequest = async (res, expected, available, reqData) => {
  if (expected === available) await makeRequest(reqData);
  else res
    .status(403)
    .send('You don\'t have permission to access this resource.');
};

async function authorizate(res, token) {
  const decodedData = tokenDecoder(token);
  if (decodedData === null) {
    res.status(401).send('Error in authorization.');
    return 0;
  }
  const email = decodedData.email;
  const password = decodedData.password;
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`
    );
    return result.rows[0];
  } catch (error) {
    console.log(error.message);
    res.status(404).send('Error in query to db.');
  }
}

module.exports = {
  makeRequest,
  makeQuery,
  tokenGenerator,
  tokenDecoder,
  checkedRequest,
  authorizate,
  processLimit,
  makeRequestWithTotal
};
