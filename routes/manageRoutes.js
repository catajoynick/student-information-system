const manageController = require("../controllers/manageController");
const express = require("express");
const router = express.Router();
/**
 * DISPLAYS THE DASH BOARD
 */
router.get("/", manageController.displayDashboard);
/**
 * DISPLAYS STUDENT DATA BY COURSE
 */
router.get("/:course", manageController.getStudentsByCourse);
/**
 * LOGIN ROUTE
 */
router.post("/", manageController.login);
module.exports = router;
