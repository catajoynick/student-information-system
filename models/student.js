const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  studentPhoto: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearLevel: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = Joi.object({
    _id: Joi.string().min(1).max(255).required(),
    fullName: Joi.string().min(1).max(255).required(),
    course: Joi.string().min(1).max(255).required(),
    yearLevel: Joi.string().min(1).max(255).required(),
    contactNumber: Joi.string().min(1).max(255).required(),
    emailAddress: Joi.string().min(1).max(255).required(),
  });

  return schema.validateAsync(student);
}

module.exports.Student = Student;
module.exports.validate = validateStudent;
