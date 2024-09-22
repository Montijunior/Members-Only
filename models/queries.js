const pool = require("./pool");

const query = {
  async getUserById(id) {
    try {
      const query = {
        text: "SELECT * FROM members WHERE id = $1;",
        values: [id],
      };
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  },
  async getUsername(username) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM members WHERE username = $1;",
        [username]
      );
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  },
  async insertUser(first_name, last_name, username, password) {
    try {
      await pool.query(
        "INSERT INTO members (first_name, last_name, username, password) VALUES ($1, $2, $3, $4);",
        [first_name, last_name, username, password]
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  async insertMessage(member_id, title, text) {
    try {
      await pool.query(
        "INSERT INTO messages (member_id, title, text) VALUES ($1, $2, $3);",
        [member_id, title, text]
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  async getMessages() {
    try {
      const { rows } = await pool.query("SELECT * FROM messages");
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  },
  async deleteMessage(id) {
    try {
      await pool.query("DELETE FROM messages WHERE id = $1;", [id]);
    } catch (error) {
      console.error(error.message);
    }
  },
  async deleteMember(id) {
    try {
      await pool.query("DELETE FROM members WHERE id = $1;", [id]);
    } catch (error) {
      console.error(error.message);
    }
  },
  async allUsersDataAndMessages() {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM members INNER JOIN messages ON members.id = messages.member_id ORDER BY time;"
      );
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = query;
