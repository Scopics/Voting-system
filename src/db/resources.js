'use strict';
const pool = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getQueryParamsArr(queryParams, queryParamsOrder) {
  if (!queryParamsOrder)
    return Object.values(queryParams);
  const queryParamsArr = [];
  queryParamsOrder.forEach(key => queryParamsArr.push(queryParams[key]));
  return queryParamsArr;
}

async function makeRequest(reqData, authentification) {
  const { req, res, query, queryParamsOrder } = reqData;
  const reqParams = req.params;
  const reqQuery = req.query;
  const queryParamsUnordered = { ...reqQuery, ...reqParams };

  const queryParamsOrdered =
    getQueryParamsArr(queryParamsUnordered, queryParamsOrder);
  const queryData = {
    queryParams: queryParamsOrdered,
    query
  };

  try {
    if (authentification) {
      const { email, password } = queryParamsUnordered;
      const token = tokenGenerator(email, password);
      await makeQuery(queryData);
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

async function makeQuery(queryData) {
  const { queryParams, query } = queryData;
  const queryParamsArr = Object.values(queryParams);
  try {
    const result = await pool.query(query, queryParamsArr);
    return result.rows;
  } catch (error) {
    console.log(error.message);
  }
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
  authorizate
};
