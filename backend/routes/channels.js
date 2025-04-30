const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");

router.post("/", channelController.create);
router.get("/", channelController.getAllByUser);
router.get("/all", channelController.getAll);
router
  .route("/:id")
  .get(channelController.get)
  .put(channelController.update)
  .delete(channelController.remove);

module.exports = router;
