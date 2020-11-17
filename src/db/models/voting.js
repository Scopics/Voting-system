'use strict';

const pool = require('../db');


class Voting {




  async getAll() {
    try {
      const votings = await pool.query(
        'SELECT * FROM votings ORDER BY start_date DESC;'
      );
      return votings.rows;
    } catch (error) {
      return error.detail;
    }
  }


  async result(voting_id) {
    try {
      const result = await pool.query(
        `SELECT variants.name, COUNT(voting_results.user_id) AS votes
        FROM voting_results
        INNER JOIN variants
            ON voting_results.variant_id = variants.variant_id
        WHERE voting_results.voting_id = ${voting_id}
        GROUP BY variants.name
        ORDER BY votes DESC;`
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }

  async resultDistrict(voting_id, district_id) {
    try {
      const result = await pool.query(
        `SELECT var.name, COUNT(vr.variant_id) AS num_voters
        FROM voting_results vr
        LEFT JOIN users u
            ON u.user_id=vr.user_id
        LEFT JOIN variants var
            ON var.variant_id = vr.variant_id
        WHERE vr.voting_id = ${voting_id} AND u.district_id = ${district_id}
        GROUP BY var.name
        ORDER by num_voters DESC;`
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }



}

module.exports = new Voting();
