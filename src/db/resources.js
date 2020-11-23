const pool = require('./db');
const jwt = require("jsonwebtoken");
require('dotenv').config();

function getQueryParamsArr(queryParams, queryParamsOrder) {
  if (!queryParamsOrder)
    return Object.values(queryParams);
  const queryParamsArr = [];
  queryParamsOrder.forEach(key => queryParamsArr.push(queryParams[key]));
  return queryParamsArr;
}

async function makeRequest(reqData) {
  const {req, res, query, queryParamsOrder} = reqData;
  const reqParams = req.params;
  const reqQuery = req.query;
  const queryParamsUnordered = {...reqQuery, ...reqParams};
  const queryParamsOrdered = 
    getQueryParamsArr(queryParamsUnordered, queryParamsOrder);
  const queryData = {
    queryParams: queryParamsOrdered,
    queryParamsOrder,
    query
  };
  try {
    const result = await makeQuery(queryData);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

async function makeQuery(queryData) {
  const { queryParams, query } = queryData;
  const queryParamsArr = Object.values(queryParams);
  try {
    const result = await pool.query(query, queryParamsArr);
    return result.rows;
  } catch(error) {
    console.log(error.message)
  }
}

function tokenGenerator(user_id){
    const payload = {
        userId : user_id
    };
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn : "1hr" });
} 

const tokenDecoder = token => jwt.decode(token);

module.exports = { makeRequest, makeQuery, tokenGenerator, tokenDecoder };
