//require loads the module into a constant named logger

const Logger = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");
const http = require("http");

//gets info about the memory of the system
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//gets info on the path of the file
const pathObj = path.parse(__filename);
console.log(pathObj);

// Synchronousfilesystem
//const files = fs.readdirSync("./");
// Asynchronous filesystem
const files = fs.readdir("./", (err, files) => {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
console.log(files);

//Logger Class instantiation
const logger = new Logger();
//Register a listener
logger.on("messageLogged", arg => {
  console.log("Listener called", arg);
  //console.log("Listner called", arg);
});

//using an imported class with the function log
logger.log("message");

//http: server is an event emitter
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.on("connection", socket => {
  console.log("New connection...");
});
server.listen(3002);
console.log("listening on port 3002");
