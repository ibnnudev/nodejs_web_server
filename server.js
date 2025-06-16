const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  console.log("Finished!");
};

app.get("/chain", one, two, three);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
