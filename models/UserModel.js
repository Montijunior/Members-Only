const pool = require("./pool");

class UserModel {
  // get all users data excluding (password and username) and join with message table
  async getAllUsersData() {
    try {
      const query = {
        text: "SELECT member_id, message_id, first_name || ' ' || last_name AS full_name, membership_status, admin, title, text, time FROM members INNER JOIN messages USING(member_id); ",
      };
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  }

  // insert new message
  async insertMessage(member_id, title, text) {
    try {
      const query = {
        text: "INSERT INTO messages (member_id, title, text) VALUES ($1, $2, $3);",
        values: [member_id, title, text],
      };
      await pool.query(query);
    } catch (error) {
      console.error(error.message);
    }
  }

  // get all messages
  async getAllMessages() {
    try {
      const { rows } = await pool.query(
        "SELECT title, text, time FROM messages;"
      );
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  }

  // for admins: delete message by id
  async deleteMessage(member_id) {
    try {
      const query = {
        text: "DELETE FROM message WHERE member_id = $1;",
        value: [member_id],
      };
    } catch (error) {
      console.error(error.message);
    }
  }
}
