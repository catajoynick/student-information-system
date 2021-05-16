const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const { User } = require("../models/admin");

const dbString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@node-crud-project.4t0sv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const connection = mongoose.createConnection(dbString, dbOptions);

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

module.exports = function (app) {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      store: sessionStore,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
