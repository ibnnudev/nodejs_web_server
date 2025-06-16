const router = require("express").Router();
const fs = require("fs");
const path = require("path");

let data = require("../../data/employees.json");

router.get("/", (req, res) => {
  res.json(data);
});

router.get("/:id", (req, res) => {
  const employee = data.find((emp) => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(employee);
});

router.post("/", (req, res) => {
  const newEmployee = {
    id: data.length + 1,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
  };

  data.push(newEmployee);
  fs.writeFileSync(
    path.join(__dirname, "../../data/employees.json"),
    JSON.stringify(data, null, 2)
  );
  res.status(201).json(newEmployee);
});

router.put("/:id", (req, res) => {
  const employee = data.find((emp) => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  employee.name = req.body.name || employee.name;
  employee.position = req.body.position || employee.position;
  employee.department = req.body.department || employee.department;
  fs.writeFileSync(
    path.join(__dirname, "../../model/employees.json"),
    JSON.stringify(data, null, 2)
  );
  res.json(employee);
});

router.delete("/:id", (req, res) => {
  const employeeIndex = data.findIndex(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (employeeIndex === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }
  const deletedEmployee = data.splice(employeeIndex, 1);
  fs.writeFileSync(
    path.join(__dirname, "../../data/employees.json"),
    JSON.stringify(data, null, 2)
  );
  res.json(deletedEmployee);
});

module.exports = router;
