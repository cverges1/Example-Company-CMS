const inquirer = require("inquirer");
const dataMananger = require("./Models/index");
const cTable = require("console.table");
const db = require("./db/connection.js");

const questions = [
  {
    type: "list",
    name: "questionOne",
    message: "What would you like to do?",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Exit",
    ],
  },
];

const addDepartmentQuestions = [
  {
    type: "input",
    name: "newName",
    message: "What is the name of the new department?",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "department",
    message: "What is the name of the department the new role belongs to?",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of the new role?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the new role?",
  },
];

const newEmployeeQuestions = [
  {
    type: "input",
    name: "first",
    message: "What is the first name of the new employee?",
  },
  {
    type: "input",
    name: "last",
    message: "What is the last name of the new employee?",
  },
  {
    type: "input",
    name: "role",
    message: "What is the employee's role?",
  },
  {
    type: "input",
    name: "manager",
    message: "Who is the employee's manager?",
  },
];

const init = () => {
  inquirer.prompt(questions).then((answers) => {
    if (answers.questionOne !== "Exit") {
      if (answers.questionOne === "View all Departments") {
        dataMananger
          .displayDepartments()
          .then(([rows]) => console.table(rows))
          .then(() => init());
      }
      if (answers.questionOne === "View all Roles") {
        dataMananger
          .displayRoles()
          .then(([rows]) => console.table(rows))
          .then(() => init());
      }
      if (answers.questionOne === "View all Employees") {
        dataMananger
          .displayEmployees()
          .then(([rows]) => console.table(rows))
          .then(() => init());
      }
      if (answers.questionOne === "Add a Department") {
        inquirer.prompt(addDepartmentQuestions).then((answers) => {
          dataMananger
            .addDepartment(answers)
            .then(() => console.log("Successfully Added Department"))
            .then(() => init());
        });
      }
      if (answers.questionOne === "Add a Role") {
        inquirer.prompt(addRoleQuestions).then((answers) => {
          dataMananger
            .findDepartment(answers)
            .then(([rows]) => dataMananger.updateRole(rows, answers))
            .then(() => console.log("Successfully Added Role"))
            .then(() => init());
        });
      }
      if (answers.questionOne === "Add an Employee") {
        inquirer.prompt(addRoleQuestions).then((answers) => {
          dataMananger
            .findDepartment(answers)
            .then(([rows]) => dataMananger.updateRole(rows, answers))
            .then(() => console.log("Successfully Added Role"))
            .then(() => init());
        });
      }
    } else {
      console.log("Thanks! Goodbye!");
    }
  });
  return;
};

init();
