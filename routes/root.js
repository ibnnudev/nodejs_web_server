const router = require("express").Router();
const path = require("path");

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/index", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/index.html", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});
router.get("/new-page.html", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page", (_req, res) => {
  res.redirect(301, "/new-page.html");
});
router.get("/old-page.html", (_req, res) => {
  res.redirect(301, "/new-page.html");
});

module.exports = router;
