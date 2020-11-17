'use strict';

const Falsification = require('../db/models/falsification');
const express = require('express');
const router = express.Router();



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



module.exports = router;
