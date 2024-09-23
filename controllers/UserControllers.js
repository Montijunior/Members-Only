const DB = require("../models/queries");
const { body, validationResult } = require("express-validator");

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
  return res.render("messageForm", { title: "New Message" });
};
