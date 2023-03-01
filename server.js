const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
});

app.get("/addlisting", (req, res) => {
  res.sendFile(path.join(initial_path, "addlisting.html"));
});

app.get("/:propertydescription", (req, res) => {
  res.sendFile(path.join(initial_path, "propertydescription.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(initial_path, "signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(initial_path, "login.html"));
});
app.use((req, res) => {
  res.json("404");
});

app.listen("3000", () => {
  console.log("listening......");
});
