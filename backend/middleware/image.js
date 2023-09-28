import multer from "multer";

const storage = multer.diskStorage({
  destination: "images",

  filename: function (req, file, cb) {
    cb(null, -Date.now() + "-" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: filefilter }).single(
  "image"
);

export default upload;
