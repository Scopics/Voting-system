'use strict';

const pool = require('../db');

class Petition {


  async getAll() {
    try {
      const petitions = await pool.query(
        'SELECT * FROM petitions ORDER BY start_date DESC;'
      );
      return petitions.rows;
    } catch (error) {
      return error.detail;
    }
  }

  async create(name, description, author_user_id, start_date, end_date) {
    try {
      await pool.query(
        "INSERT INTO petitions VALUES (default, $1, $2, $3, $4, $5;", [name, description, author_user_id, start_date, end_date]
      );
      return { msg: 'OK' };
    } catch (error) {
      return error.detail;
    }
  }

  async result(petition_id) {
    try {
      const result = await pool.query(
        "SELECT petitions.name, count(petitions.petition_id) AS votes " +
          "FROM petitions " +
          "INNER JOIN petition_results " +
              "ON petitions.petition_id = petition_results.petition_id " +
          "WHERE petitions.petition_id = $1 " +
          "GROUP BY petitions.name " +
          "ORDER BY votes DESC;",
          [petition_id]
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }

  async resultDistrict(petition_id, district_id) {
    try {
      const result = await pool.query(
        "SELECT d.name, count(u.name) AS votes" +
        "FROM users u" +
        "INNER JOIN petition_results pr" +
            "ON pr.user_id = u.user_id" +
        "INNER JOIN petitions p" +
            "ON p.petition_id = pr.petition_id" +
        "INNER JOIN districts d" +
            "ON u.district_id = d.district_id" +
        "WHERE p.petition_id = $1 AND d.district_id = $2" +
        "GROUP BY d.name" +
        "ORDER BY votes DESC;", [petition_id ,district_id]
      );
      return result.rows;
    } catch (error) {
      return error.detail;
    }
  }


}

module.exports = new Petition();
