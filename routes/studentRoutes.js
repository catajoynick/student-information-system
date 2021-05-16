const studentController = require("../controllers/studentController");
const expess = require("express");
const router = expess.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";

    case "image/jpg":
      return ".jpg";

    case "image/jpeg":
      return ".jpg";
  }
};

const fileFilter = (req, file, cb) => {
  if (file.mimeType === "video/mp4" || file.mimeType === "video/avi") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

/**
 * GET SPECIFIC STUDENT GIVEN BY COURSE
 */
router.get("/:id", studentController.getStudentById);

/**
 * ADDS A NEW STUDENT
 */
router.post(
  "/",
  upload.single("studentPhoto"),
  studentController.postNewStudent
);
/**
 * Updates student with given id
 */
router.put("/:id", studentController.updateStudentById);
/**
 * DELETE A SPECIFIC STUDENT GIVEN ID
 */
router.delete("/:id", studentController.deleteStudentById);

module.exports = router;
