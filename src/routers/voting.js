'use strict';

const Voting = require('../db/models/voting');
const express = require('express');
const router = express.Router();

//create voting
router.get('/create', async (req, res) => {
  try {
    const { name, description,
      start_date, end_date } = req.query;
    const votingData = { 
      name: 'new Election', 
      description: 'new test election',
      start_date: '2020-11-18T9:00:00.000Z', 
      end_date: '2020-11-18T20:00:00.000Z'
    };
    //зробив гамнокод, тому що потім будемо передавати об'єкт
    const result = await Voting.create(votingData);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
})

// get specific voting
router.get('/:idVoting', async (req, res) => {
  try {
    const idVoting = req.params.idVoting;
    const result = await Voting.getInfo(idVoting);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const result = await Voting.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const idVoting = req.params.idVoting;
    const result = await Voting.result(idVoting);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:idVoting/resultDistrict', async (req, res) => {
  try {
    const idVoting = req.params.idVoting;
    const idDistrict = req.body.idDistrict;
    const result = await Voting.resultDistrict(idVoting, idDistrict);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
