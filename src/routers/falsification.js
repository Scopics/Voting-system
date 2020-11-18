'use strict';

const Falsification = require('../db/models/falsification');
const express = require('express');
const router = express.Router();



// create
router.post('/create', async (req, res) => {
  try {
    const { author_user_id, voting_id, title, description } = req.body;
    const result = Falsification.create(author_user_id, voting_id, title, description);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get specific falsification
router.get('/:idFalsification', async (req, res) => {
  try {
    const idFalsification = req.params.idFalsification;
    const result = await Falsification.getInfo(idFalsification);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get all falsifications
router.get('/all', async (req, res) => {
  try {
    const result = await Falsification.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
