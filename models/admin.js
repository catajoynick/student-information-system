const passportLocalMongoose = require("passport-local-mongoose");
const Joi = require("joi");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

adminSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", adminSchema);

function validateInput(admin) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(admin);
}
module.exports.User = User;
module.exports.validate = validateInput;
