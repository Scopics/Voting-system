'use strict';

const Petition = require('../db/models/petition');
const express = require('express');
const { response } = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

// create
router.post('/create', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.create'],
    queryParamsOrder: order['Petitions.create'],
  }
  await makeRequest(reqData);
});

//get info for petition
router.get('/:idPetition', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.getInfo']
  }
  await makeRequest(reqData);
})

// get all
router.get('/all', async (req, res) => {
  try {
    const result = await Petition.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//vote for petition
router.get('/:idPetition/vote', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petition_results.addVote']
  }
  await makeRequest(reqData);
});

// get result
router.get('/:idPetition/resultGeneral', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.result'],
    queryParamsOrder: order['Petitions.result'],
  }
  await makeRequest(reqData);
});

router.get('/:idPetition/resultRegion', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.resultRegion'],
    queryParamsOrder: order['Petitions.resultRegion'],
  }
  await makeRequest(reqData);
});

router.get('/:idPetition/resultDistrict', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.resultDistrict'],
    queryParamsOrder: order['Petitions.resultDistrict'],
  }
  await makeRequest(reqData);
});

module.exports = router;
