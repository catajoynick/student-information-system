const { validate, Student } = require("../models/student");
const fs = require("fs");
/**
 * GET SPECIFIC STUDENT BY ID
 */
async function getStudentById(req, res) {
  if (req.isAuthenticated()) {
    //Queries db for specific student given by id
    const result = await Student.find({ _id: req.params.id });
    //Checks if there is one.
    if (result.length == 0)
      //If there is none render error page.
      return res.status(404).render("error", {
        error: "Student with given student ID doesnt exists",
      });

    //Render student.
    res.status(200).render("student", { student: result });
  } else {
    res.redirect("/");
  }
}
/**
 * ADDS NEW STUDENT TO DB
 */
async function postNewStudent(req, res) {
  if (req.isAuthenticated()) {
    //Checks if inputs are valid.
    const { error } = validate(req.body);
    //Check if there is an  error
    if (error)
      return res
        .status(400)
        .render("error", { error: error.details[0].message });

    //Checks if student with given student id already exists.
    const student = await Student.findOne({ _id: req.body._id });
    if (student)
      return res.render("error", {
        error: "Student ID already exists.",
      });
    //Builds a new student Object
    const newStudent = new Student({
      _id: req.body._id,
      studentPhoto: req.file.path,
      fullName: req.body.fullName,
      course: req.body.course,
      yearLevel: req.body.yearLevel,
      contactNumber: req.body.contactNumber,
      emailAddress: req.body.emailAddress,
    });

    //Saves it to db
    await newStudent.save();
    res.redirect(`/manage/${req.body.course}`);
  } else {
    res.redirect("/");
  }
}
/**
 * UPDATES STUDENT INFO WITH GIVEN ID
 */
async function updateStudentById(req, res) {
  if (req.isAuthenticated()) {
    const student = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fullName: req.body.fullName,
          course: req.body.course,
          yearLevel: req.body.yearLevel,
          contactNumber: req.body.contactNumber,
          emailAddress: req.body.emailAddress,
        },
      }
    );
    res.json({ redirect: `/student/${req.body._id}` });
  } else {
    res.redirect("/");
  }
}
/**
 * DELETE STUDENT WITH GIVEN ID
 */
async function deleteStudentById(req, res) {
  if (req.isAuthenticated()) {
    //Checks if student exists
    const student = await Student.findByIdAndRemove(req.params.id);

    //Deletes the photo from directory
    fs.unlink(student.studentPhoto, (err) => {
      if (err) console.log(err);
    });

    //Redirect the user
    res.json({ redirect: `/manage/${student.course}` });
  } else {
    res.redirect("/");
  }
}

module.exports = {
  getStudentById,
  postNewStudent,
  updateStudentById,
  deleteStudentById,
};
