//loads module and returns an object
const config = require("config");
const Joi = require("Joi");
const express = require("express");
const logger = require("./logger");
const authenticator = require("./authenticator");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const app = express();
//this method calls a middleware inorder to use JSON for post operations
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public")); // key=value&key=value
app.use(logger);
app.use(authenticator);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

//DB work...
dbDebugger("Connected to the database...");

//first param: root, second param: callback function
app.get("/", (req, res) => {
  //sends a response
  res.send("Hello World");
});

//listener on port 3002
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
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
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // 404 object not found
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // 404 object not found
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

// Environment variable to replace using hardcoded ports
//PORT
const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Listening on port ${port}...`));
