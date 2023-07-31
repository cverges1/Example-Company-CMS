const inquirer = require("inquirer");
const dataMananger = require("./Models/index");
const cTable = require("console.table");
const db = require("./db/connection.js");

let employeeList = [];
let roleList = [];

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

const addEmployeeQuestions = [
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

const updateEmployeeList = [
  {
    type: "list",
    name: "employee",
    message: "Which employee would you like to update?",
    choices: employeeList,
  },
  {
    type: "list",
    name: "role",
    message: "Which role would you like to assign them?",
    choices: roleList,
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
            .then(([rows]) => dataMananger.addRole(rows, answers))
            .then(() => console.log("Successfully Added Role"))
            .then(() => init());
        });
      }
      if (answers.questionOne === "Add an Employee") {
        inquirer.prompt(addEmployeeQuestions).then((answers) => {
          dataMananger.findRole(answers).then(([role]) =>
            dataMananger
              .findManager(answers)
              .then(([manager]) =>
                dataMananger.addEmployee(answers, role, manager)
              )
              .then(() => console.log("Successfully Added Employee"))
              .then(() => init())
          );
        });
      }
      if (answers.questionOne === "Update an Employee Role") {
        employeeList = dataMananger
          .displayEmployees()
          .then(([rows]) => dataMananger.prepEmployeeForChoices(rows))
          .then((choices) => {
            updateEmployeeList[0].choices = choices;
            return choices;
          });
        roleList = dataMananger
          .displayRoles()
          .then(([rows]) => dataMananger.prepRoleForChoices(rows))
          .then((choices) => {
            updateEmployeeList[1].choices = choices;
            return choices;
          });

        Promise.all([employeeList, roleList]).then(() => {
          inquirer.prompt(updateEmployeeList).then((answers) => {
            dataMananger.findEmployee(answers.employee).then(([employee]) => {
              dataMananger.findRole(answers.role).then(([role]) => dataMananger.updateEmployee(role,employee))
              .then(() => console.log("Successfully Updated Employee"))
              .then(() => init())
            });
            
          })
        });
      }
    } else {
      console.log("Thanks! Goodbye!");
      process.exit();
    }
  });
  return
};

init();
