const { Student } = require("../models/student");
const { User } = require("../models/admin");
const passport = require("passport");

// List students by course
async function getStudentsByCourse(req, res) {
  //checks if user is authenticated
  if (req.isAuthenticated()) {
    const course = req.params.course;

    // Grabs all student by course
    await Student.find({ course: course })
      .sort({ yearLevel: 1 })
      .then((result) => {
        res.render("student_course", { students: result });
      });
  } else {
    res.redirect("/");
  }
}

// Displays the dashboard
function displayDashboard(req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
}

// Login route
function login(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.render("error", { error: "Authenticate" });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/manage");
      });
    }
  });
}
module.exports = {
  displayDashboard,
  getStudentsByCourse,
  login,
};
