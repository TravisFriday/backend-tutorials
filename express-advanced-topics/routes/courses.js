const express = require("express");
const Joi = require("Joi");

const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

//listener on port 3002
router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);

  //Validate
  //If invalid, return 400 - Bad request
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// route of a course ->  /api/courses/1
router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // 404 object not found
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

router.put("/:id", (req, res) => {
  //Look up the course, sends 404 if not found
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  //object destructuring to get the error property alone

  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);

  //Validate
  //If invalid, return 400 - Bad request
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //Update course
  course.name = req.body.name;
  res.send(course);
  //Return the updated course
});

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // 404 object not found
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
