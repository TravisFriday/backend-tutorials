//loads module and returns an object
const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const authenticator = require("./authenticator");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
//this method calls a middleware inorder to use JSON for post operations
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public")); // key=value&key=value
app.use(logger);
app.use(authenticator);
app.use("/api/courses", courses);
app.use("/", home);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// Environment variable to replace using hardcoded ports
//PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
