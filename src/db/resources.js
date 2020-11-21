const fs = require("fs");
const pool = require('../db/db');
const fileContent = fs.readFileSync('src/resources/queries.json');
const queries = JSON.parse(fileContent);

async function makeRequest(reqData) {
  const {req, res, query} = reqData;
  const reqParams = req.params;
  const reqQuery = req.query;
  const queryData = {
    queryParams: {...reqQuery, ...reqParams},
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
    const petitions = await pool.query(query, queryParamsArr);
    return petitions.rows;
  } catch(error) {
    const petitions = await pool.query(query, queryParamsArr);
    return petitions.rows;
  }
}

module.exports = { queries, makeRequest, makeQuery };