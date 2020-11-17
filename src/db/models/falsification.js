'use strict';

const pool = require('../db.js');

class Falsification {



  async getInfo(falsification_id) {
    try {
      const falsifications = await pool.query(
        `SELECT * FROM falsifications WHERE falsification_id = ${falsification_id};`
      );
      return falsifications.rows[0];
    } catch (error) {
      return error.detail;
    }

  }



}

module.exports = new Falsification();
