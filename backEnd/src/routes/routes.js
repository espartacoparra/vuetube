const router = require("express").Router();
const videoController = require("../controllers/videos/videoController");

router.get("/search", videoController.getSearchVideos);

module.exports = router;
