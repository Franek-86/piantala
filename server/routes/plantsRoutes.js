const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantsControllers");
const isAdmin = require("../middleware/isAdmin");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`; // Generate a unique name
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

router.get("/", plantsController.getAllPlants);
router.get("/", plantsController.getUserPlants);
router.patch("/:id/status", isAdmin, plantsController.updateStatus);
router.post("/", upload.single("image"), plantsController.addPlant);
module.exports = router;
