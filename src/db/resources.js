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
    const result = await pool.query(query, queryParamsArr);
    return result.rows;
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = { queries, makeRequest, makeQuery };