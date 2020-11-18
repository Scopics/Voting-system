'use strict';

const pool = require('../db');

class User {


  async register(name, surname, birthday_date, gender, district_id, email, password, status) {
    try {
      await pool.query(
        "INSERT INTO users VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8);", [name, surname, birthday_date, gender, district_id, email, password, status]
      );
      return { msg: 'OK' };
    } catch (error) {
      return error.detail;
    }
  }

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
