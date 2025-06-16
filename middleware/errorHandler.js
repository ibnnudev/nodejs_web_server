const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
