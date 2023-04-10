const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.route("/all").get(todoController.list);
router.route("/").post(todoController.create);
router.route("/:id").delete(todoController.delete);

module.exports = router;
