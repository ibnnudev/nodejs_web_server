const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const cors = require("cors");

// CORS middleware
const whitelist = ["https://www.google.com", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// custom middleware logger
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
