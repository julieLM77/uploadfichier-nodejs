const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const multer = require("multer");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const upload = multer({
   dest: "tmp/",
   limits: {
     fileSize: 3 * 1024 * 1024
   },
   fileFilter: (req, file, cb) => {
     if (!file.mimetype.includes("image/png")) {
       cb(new Error("Le format n'est pas accepté"))
     }
     cb(null, true);
   }
});

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/monupload", upload.array("monfichier"), (req, res, next) => {
  console.log(req.files);
  res.end();
})

module.exports = router;
