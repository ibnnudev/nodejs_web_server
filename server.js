const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;
const cors = require("cors");

const rootRouter = require("./routes/root");
const subdirRouter = require("./routes/subdir");
const employeesRouter = require("./routes/api/employee");

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

app.use(logger);

app.use(errorHandler);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/subdir", subdirRouter);
app.use("/api/employees", employeesRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
