// GET home page
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.users_homepage_get = async (req, res) => {
  const usersData = await UserModel.getAllUsersData();
  const usersMessage = await UserModel.getAllMessages();
  res.render("index", {
    title: "Home",
    data: usersData,
    messages: usersMessage,
    user: req.user,
  });
};
