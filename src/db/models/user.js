'use strict';

const pool = require('../db');

class User {


  async register(name, surname, birthday_date, gender, district_id, email, password, status) {
    try {
      await pool.query(
        `INSERT INTO users VALUES (default, ${name}, ${surname}, ${birthday_date}, ${gender}, 
          ${district_id}, ${email}, ${password}, ${status});`
      );
      return { msg: 'OK' };
    } catch (error) {
      return error.detail;
    }
  }

  async login(email, password) {
    try {
      const user = await pool.query(
        `SELECT * FROM users
        WHERE users.email = ${email} AND users.password = ${password};`
      );
      return user.rows;
    } catch (error) {
      return error.detail;
    }
  }


}

module.exports = new User();
