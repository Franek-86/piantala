const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantsControllers");
const isAdmin = require("../middleware/isAdmin");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      "/Users/macbook/Desktop/piantala/server/uploads"
    ); // Set your absolute path here
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`; // Generate a unique name
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

router.get("/", plantsController.getAllPlants);
router.get("/user-plants", plantsController.getUserPlants);
router.patch("/:id/status", isAdmin, plantsController.updateStatus);
router.post("/add-plant", upload.single("image"), plantsController.addPlant);
module.exports = router;
