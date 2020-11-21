'use strict';

const Voting = require('../db/models/voting');
const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const router = express.Router();

//create voting
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.create']
  }
  await makeRequest(reqData);
});

// get specific voting
router.get('/:idVoting', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getAll']
  };
  await makeRequest(reqData);
});

// get variants for specific voting
router.get('/:idVoting/variants', async (req, res) => {
  try {
    const idVoting = req.params.idVoting;
    const result = await Voting.getVariants(idVoting);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get all votings
router.get('/all', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.getAll']
  };
  await makeRequest(reqData);
});

// get current votings
router.get('/current', async (req, res) => {
  try {
    const result = await Voting.getCurrent();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get result
router.get('/:idVoting/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.result']
  };
  await makeRequest(reqData);
});

router.get('/:idVoting/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Voting.resultDistrict']
  };
  await makeRequest(reqData);
});

module.exports = router;
