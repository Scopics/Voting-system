'use strict';

const pool = require('../db');
const { queries } = require('../resources');

class Voting {
  async create(votingData) {
    const queryData = Object.values(votingData);
    const createVotingQuery = queries['Voting.create'];
    try {
      await pool.query(
        createVotingQuery, queryData
      );
      return true;
    } catch (error) {
      return error.detail;
    }
  }

  async getInfo(voting_id) {
    try {
      const votings = await pool.query(
        "SELECT * FROM votings WHERE voting_id  = $1;", [voting_id]
      );
      return votings.rows;
    } catch (error) {
      return error.detail;
    }
  }

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

  async getAll() {
    try {
      const votings = await pool.query(
        "SELECT * FROM votings ORDER BY start_date DESC;"
      );
      return votings.rows;
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

  async result(voting_id) {
    try {
      const result = await pool.query(
        "SELECT variants.name, COUNT(voting_results.user_id) AS votes" +
        "FROM voting_results" +
        "INNER JOIN variants" +
            "ON voting_results.variant_id = variants.variant_id" +
       " WHERE voting_results.voting_id = $1" +
        "GROUP BY variants.name" +
        "ORDER BY votes DESC;`", [voting_id]
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }

  async resultDistrict(voting_id, district_id) {
    try {
      const result = await pool.query(
        "SELECT var.name, COUNT(vr.variant_id) AS num_voters" +
        "FROM voting_results vr" +
        "LEFT JOIN users u" +
            "ON u.user_id=vr.user_id" +
        "LEFT JOIN variants var" +
            "ON var.variant_id = vr.variant_id" +
        "WHERE vr.voting_id = $1 AND u.district_id = $2" +
        "GROUP BY var.name" +
        "ORDER by num_voters DESC;", [voting_id, district_id]
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }


}

module.exports = new Voting();
