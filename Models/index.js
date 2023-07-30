const db = require("../db/connection.js");

class Data {
  constructor(connection) {
    this.connection = connection;
  }

  displayDepartments() {
    return this.connection.promise().query("SELECT * FROM DEPARTMENT");
  }

  displayRoles() {
    return this.connection.promise().query("SELECT * FROM ROLE");
  }

  displayEmployees() {
    return this.connection.promise().query("SELECT * FROM EMPLOYEE");
  }

  addDepartment(data) {
    return this.connection
      .promise()
      .query(`INSERT INTO department (name) VALUES ('${data.newName}')`);
  }

  findDepartment(data) {
    const name = data.department;

    return this.connection
      .promise()
      .query(
        `SELECT id FROM DEPARTMENT WHERE name = ?`,
        name,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("result", result);
          }
        }
      );
  }

  findRole(data) {
    let role;
    if (typeof data === "object") {
      role = data.role;
    }
    if (typeof data === "string") {
      role = data;
    }
    return this.connection
      .promise()
      .query(`SELECT id FROM ROLE WHERE title = ?`, role, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("result", result);
        }
      });
  }

  findManager(data) {
    const managerTemp = data.manager.split(" ");
    const managerFirst = managerTemp[0];
    const managerLast = managerTemp[1];

    return this.connection
      .promise()
      .query(
        `SELECT id FROM EMPLOYEE WHERE first_name = ?`,
        managerFirst,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("result", result);
          }
        }
      );
  }

  findEmployee(data) {
    const employeeTemp = data.split(" ");
    const employeeFirst = employeeTemp[0];
    const employeeLast = employeeTemp[1];

    return this.connection
      .promise()
      .query(
        `SELECT id FROM EMPLOYEE WHERE first_name = ?`,
        employeeFirst,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("result", result);
          }
        }
      );
  }

  addRole(id, data) {
    return this.connection
      .promise()
      .query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}','${data.salary}','${id[0].id}')`
      );
  }

  addEmployee(data, role, manager) {
    return this.connection
      .promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.first}','${data.last}','${role[0].id}','${manager[0].id}')`
      );
  }

  updateEmployee(role,employee) {
    return this.connection
    .promise()
    .query(
      `UPDATE employee SET role_id = ${role[0].id} WHERE id =  ${employee[0].id}`
    );
  }

  prepEmployeeForChoices(data) {
    const nameArr = [];

    for (let i = 0; i < data.length; i++) {
      const employeeFirstName = data[i].first_name;
      const employeeLastName = data[i].last_name;
      const employeeFull = `${employeeFirstName} ${employeeLastName}`;

      nameArr.push(employeeFull);
    }
    // console.log(nameArr)
    return nameArr;
  }

  prepRoleForChoices(data) {
    const roleArr = [];

    for (let i = 0; i < data.length; i++) {
      let roleTitle = data[i].title;
      roleArr.push(roleTitle);
    }
    // console.log(roleArr)
    return roleArr;
  }
}

module.exports = new Data(db);
