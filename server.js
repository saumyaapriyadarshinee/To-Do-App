const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = []; // ✅ In-memory storage

// Home - Show tasks
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// Add Task
app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task.trim() !== "") {
    tasks.push({ text: task, done: false });
  }
  res.redirect("/");
});

// Mark Task as Done
app.post("/done/:index", (req, res) => {
  const index = req.params.index;
  tasks[index].done = !tasks[index].done;
  res.redirect("/");
});

// Delete Task
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("To-Do App running at http://localhost:3000");
});
