'use strict';

const pool = require('../db');
const { queries } = require('../resources');

class Voting {

  async getVariants(voting_id) {
    try {
      const variants = await pool.query(
        "SELECT * FROM variants WHERE voting_id = $1", [voting_id]
      );
      return variants.rows;
    } catch (error) {
      return error.detail;
    }
  }


  async getCurrent(){
    try {
      const votings = await pool.query(
        "SELECT * FROM votings WHERE (start_date < NOW() AND NOW() < end_date);"
      );
      return votings.rows;
    } catch (error) {
      return error.detail;
    }
  }

  
}

module.exports = new Voting();
