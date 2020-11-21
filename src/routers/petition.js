'use strict';

const Petition = require('../db/models/petition');
const express = require('express');
const { response } = require('express');
const { makeRequest } = require('../db/resources');
const queries = require('../resources/queries.json');
const router = express.Router();

// create
router.post('/create', async (req, res) => {
  try {
    const { name, description, author_user_id, start_date, end_date } = req.body;
    const result = Petition.create(name, description, author_user_id, start_date, end_date);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//get info for petition
router.get('/:idPetition', async (req, res) => {
  const reqData = {
    req, res,
    query: queries['Petitions.getInfo']
  }
  await makeRequest(reqData);
})

// get result
router.get('/:idPetition/resultGeneral', async (req, res) => {
  try {
    const idPetition = req.params.idPetition;
    const result = await Petition.result(idPetition);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get all
router.get('/all', async (req, res) => {
  try {
    const result = await Petition.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:idPetition/resultDistrict', async (req, res) => {
  try {
    const idPetition = req.params.idPetition;
    const idDistrict = req.body.idDistrict;
    const result = await Petition.resultDistrict(idPetition, idDistrict);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
