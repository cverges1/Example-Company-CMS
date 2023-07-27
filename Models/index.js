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

    return this.connection.promise().query(
        `SELECT id FROM DEPARTMENT WHERE name = ?`,
        name,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log('result',result);
          }
        }
      );
  }

  updateRole(id, data) {
    return this.connection.promise().query(
      `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}','${data.salary}','${id[0].id}')`
    )
  }
}

module.exports = new Data(db);
