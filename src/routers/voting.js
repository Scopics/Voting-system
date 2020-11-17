'use strict';

const Voting = require('../db/models/voting');
const express = require('express');
const router = express.Router();

// get all votings
router.get('/all', async (req, res) => {
  try {
    const result = await Voting.getAll();
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
