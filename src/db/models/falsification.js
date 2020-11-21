'use strict';

const pool = require('../db.js');

class Falsification {


  async create(author_user_id, voting_id, title, description) {
    try {
      await pool.query(
        "INSERT INTO falsifications VALUES (default, 1$, 2$, 3$, 4$);", [author_user_id, voting_id, title, description]
      );
      return { msg: 'OK' };
    } catch (error) {
      return error.detail;
    }
  }


  async getAll() {
    try {
      const falsifications = await pool.query(
        "SELECT * FROM falsifications"
      );
      return falsifications.rows[0];
    } catch (error) {
      return error.detail;
    }
  }


}

module.exports = new Falsification();
