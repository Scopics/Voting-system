'use strict';

const { response } = require('express');
const pool = require('../db');
const { queries } = require('../resources');

class Petition {

  async getAll() {
    try {
      const petitions = await pool.query(
        "SELECT * FROM petitions ORDER BY start_date DESC;"
      );
      return petitions.rows;
    } catch (error) {
      return error.detail;
    }
  }

  
}

module.exports = new Petition();
