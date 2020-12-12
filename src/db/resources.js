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
      res.json({ token });
    } else {
      const result = await makeQuery(queryData);
      res.json(result);
    }
  } catch (error) {
    console.log(error.message);
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

async function authorizate(token) {
  const decodedData = tokenDecoder(token);
  const email = decodedData.email;
  const password = decodedData.password;
  const result = await pool.query(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`
  );
  return !!result.rows.length;
}

module.exports = {
  makeRequest,
  makeQuery,
  tokenGenerator,
  tokenDecoder,
  authorizate
};
