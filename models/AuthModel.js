const pool = require("./pool");

// Define a class for all authentication models
class Authenticate {
  // get users username (email) and password
  async insertUser(first_name, last_name, username, password) {
    try {
      const query = {
        text: "INSERT INTO members (first_name, last_name, username, password) VALUES ($1, $2, $3, $4);",
        values: [first_name, last_name, username, password],
      };
      await pool.query(query);
    } catch (error) {
      console.error(error.message);
    }
  }

  // get user by name
  async getUserName(username) {
    try {
      const query = {
        text: "SELECT username FROM members WHERE username = $1;",
        values: [username],
      };
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  }

  // get user by id
  async getUserId(id) {
    try {
      const query = {
        text: "SELECT member_id FROM WHERE member_id = $1;",
        values: [id],
      };
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = new Authenticate();
