const express = require("express");
const router = express.Router();

//first param: root, second param: callback function
router.get("/", (req, res) => {
  //sends a response
  res.send("Hello World");

  /* Render's a Pug Template
      res.render("index", { title: "My Express App", message: "Hello" });
      */
});

module.exports = router;
