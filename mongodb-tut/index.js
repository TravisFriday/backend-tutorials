const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//Course is a Class
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node Course",
    author: "Mosh",
    tags: ["angular", "backend"],
    isPublished: true
  });
  //returns a promise to result
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course

    //Comparison operators
    /*.find({price: {$gt: 10, $lte: 20}}).limit()
    .find({ price: { $in: [10, 15, 20] } }) */
    //Logical Operators
    /*.find()
    .or([{ author: "Mosh" }, { isPublished: true }])
    .and([])*/
    //REGEX
    //.find({ author: /^Mosh/ }) //Starts with Mosh
    //.find({ author: /Hamedani$/i }) //Ends with Hamedani
    //.find({ author: /.*Mosh.*/i }) //contains Mosh
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 }) //selects specific properties to be displayed
    .count(); //returns the count of docuemts that matches the criteria
  console.log(courses);
}

async function remCourse() {
  const course = await Course.remove({ _id: "5e0e8a8a4b8ee7b41bd80722" })
    .then(() => console.log("The document was removed..."))
    .catch(err => {
      console.log("The document could not be removed...", err);
    });
}

//createCourse();

//remCourse();
getCourses();
