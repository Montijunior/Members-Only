const DB = require("../models/queries");
const { validationResult } = require("express-validator");
const { messageFormValidations } = require("../validations/validation");

// HOME PAGE
exports.home_page_get = async (req, res) => {
  const usersData = await DB.allUsersDataAndMessages();
  const messages = await DB.getMessages();
  res.render("index", {
    data: usersData,
    messages: messages,
    title: "Home",
    currentUser: req.user,
  });
};

// GET new message form
exports.get_new_message_form = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  return res.render("messageForm", { title: "New Message", errors: [] });
};

// POST new message
exports.post_new_message_form = [
  messageFormValidations,
  async (req, res) => {
    const { title, text } = req.body;
    const { id } = req.params;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.render("messageForm", {
        title: "New Message",
        errors: results.array(),
      });
    }
    await DB.insertMessage(id, title, text);
    return res.redirect("/");
  },
];
