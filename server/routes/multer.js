const multer = require("multer");
const { diskStorage, FileFilterCallback } = require("multer");

const imageDir = process.env.IMAGE_DIR || "public/";

function fileStorage() {
  diskStorage({
    destination: (req, file, cb) => {
      cb(null, imageDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
};

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

modules.exports = fileUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("file");
