'use strict';

const express = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const order = require('../resources/order.json');
const router = express.Router();

// get all districts
router.get('/districts', async (req, res) => {
    const reqData = {
      req, res,
      query: queries['GetDistricts'],
      queryParamsOrder: order['GetDistricts'],
    };
    await makeRequest(reqData);
  });

// get all regions
router.get('/regions', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['GetRegions'],
    queryParamsOrder: order['GetRegions'],
  };
  await makeRequest(reqData);
});

module.exports = router;
