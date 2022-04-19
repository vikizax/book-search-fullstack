const BookController = require("../../controller/book");
const router = require("express").Router();

router.get("/all", BookController.getAllBooks);

router.get("/details/:id", BookController.getBooksDetailsByBookId);

module.exports = router;
