const manageRoute = require("../routes/manageRoutes");
const studentRoute = require("../routes/studentRoutes");
const bodyParser = require("body-parser");
const express = require("express");

module.exports = function (app) {
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/uploads", express.static("uploads"));

  app.use("/manage", manageRoute);
  app.use("/student", studentRoute);
  app.use("/", require("../routes/applicationRoutes"));
};
