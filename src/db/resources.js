const fs = require("fs");
const pool = require('../db/db');
const fileContent = fs.readFileSync('src/resources/queries.json');
const queries = JSON.parse(fileContent);

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

module.exports = { queries, makeRequest, makeQuery };