'use strict';

const express = require('express');
const { 
  makeRequest, 
  authorizate, 
  checkedRequest, 
  processLimit, 
  tokenDecoder,
  makeQuery,
  makeRequestWithTotal,
} = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

//create voting
router.post('/create', async (req, res) => {
  try {
    // create voting
    const { name, description  } = req.query;
    const start_date = new Date(req.query.start_date);
    const end_date = new Date(req.query.end_date);

    const queryParamsCreate = [name, description, start_date, end_date];
    const queryCreate = queries["Voting.create"];
    const queryDataCreate = { 
      queryParams: queryParamsCreate, 
      query: queryCreate 
    };
    
    await makeQuery(queryDataCreate);

    // get last voting id
    const offset = 0;
    const limit = 1;
    const queryParamsLast = [limit, offset];
    const queryLast = queries["Voting.getAll"];
    const queryDataLast = { 
      queryParams: queryParamsLast, 
      query: queryLast 
    };
    const lastVotingId = (await makeQuery(queryDataLast))[0].voting_id;

    // add variants
    const variants = JSON.parse(req.query.variants);
  
    const queryAddVar = queries["Variant.add"];
    for (const variant of variants) {
      const queryParamsAddVar = [lastVotingId, variant.name, variant.description];

      const queryDataAddVar = { 
        queryParams: queryParamsAddVar,
        query: queryAddVar
      };
      await makeQuery(queryDataAddVar);
    }
    res.json([]);    
  } catch (error) {
    console.log(error.message);
    res.status(404).send('Error in query to db.');
  }
});

// get all votings
router.get('/all', async (req, res) => {
  processLimit(req);
  const { searchText } = req.query;
  const query = searchText ? 
    queries['Voting.getAllBySearch'] : 
    queries['Voting.getAll'];
  const totalQuery = searchText ? 
    queries['Voting.getAllBySearchSize'] : 
    queries['Voting.getAllSize'];
  const reqData = {
    req, res,
    query, totalQuery
  };
  makeRequestWithTotal(reqData)
});

// get current votings
router.get('/current', async (req, res) => {
  processLimit(req);
  const searchText = req.query.searchText;
  const query = searchText ? 
    queries['Voting.getCurrentBySearch'] : 
    queries['Voting.getCurrent']
  const totalQuery = searchText ? 
    queries['Voting.getCurrentBySearchSize'] : 
    queries['Voting.getCurrentSize'];
  const reqData = {
    req, res,
    query, totalQuery
  };
  makeRequestWithTotal(reqData)
});

// get variants for specific voting
router.get('/:voting_id/variants', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getVariants'],
    queryParamsOrder: order['Voting.getVariants'],
  };
  await makeRequest(reqData);
});

// get result general
router.get('/:voting_id/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.result'],
    queryParamsOrder: order['Voting.result'],
  };
  await makeRequest(reqData);
});

// get result by district
router.get('/:voting_id/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.resultDistrict'],
    queryParamsOrder: order['Voting.resultDistrict'],
  };
  await makeRequest(reqData);
});

// get result by all districts
router.get('/:voting_id/resultAllDistricts', async (req, res) => {
  const result = await makeQuery({
    query: queries['Voting.resultAllDistricts'],
    queryParams: [req.params.voting_id]
  });
  const resultByDistrict = [];
  result.forEach(district => resultByDistrict[district.district_id] ? 
    resultByDistrict[district.district_id].push(district) : 
    resultByDistrict[district.district_id] = [district]);
  res.json(resultByDistrict);
});

//get vote
router.get('/:voting_id/voteResult', async (req, res) => {
  const token = req.query.token || '';
  const decodedData = tokenDecoder(token);
  const { email } = decodedData;
  const queryData = {
    query: `SELECT user_id FROM users WHERE users.email = $1`,
    queryParams: [email]
  };
  const result = await makeQuery(queryData);
  const user = result[0];
  if (req.query.user_id != user.user_id) {
    res.status(401).send('You can not get this info');
    return;
  }
  const reqData = {
    req, res,
    query: queries['Voting_results.getVote'],
    queryParamsOrder: order['Voting_results.getVote']
  };
  await makeRequest(reqData);
});

//vote
router.post('/:voting_id/vote', async (req, res) => {
  const token = req.query.token || '';
  const decodedData = tokenDecoder(token);
  const { email } = decodedData;
  const queryData = {
    query: `SELECT user_id FROM users WHERE users.email = $1`,
    queryParams: [email]
  };
  const result = await makeQuery(queryData);
  const user = result[0];
  
  if (req.query.user_id != user.user_id) {
    res.status(401).send('You can not get this info');
    return;
  }
  const reqData = {
    req, res,
    query: queries['Voting_results.addVote'],
    queryParamsOrder: order['Voting_results.addVote']
  };
  const userInfo = await authorizate(res, req.query.token);
  if (Object.prototype.hasOwnProperty.call(userInfo, 'user_id')) {
    await makeRequest(reqData);
  }
});

// get specific voting
router.get('/:voting_id', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getInfo'],
    queryParamsOrder: order['Voting.getInfo'],
  };
  await makeRequest(reqData);
});

module.exports = router;
