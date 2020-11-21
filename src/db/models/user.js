'use strict';

const pool = require('../db');

class User {



  async login(email, password) {
    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE users.email = $1 AND users.password = $2;", [email, password]
      );
      return user.rows;
    } catch (error) {
      return error.detail;
    }
  }


}

module.exports = new User();
