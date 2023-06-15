const cTable = require('console.table');
const db = require('../db/connection.js');

class Data {
    constructor () {
        this.questionOne = '';
    }

    displayDepartments (data) {
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
        })
    }

    displayRoles (data) {
        db.query('SELECT * FROM role', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
        })
    }

    displayEmployees (data) {
        db.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            console.log('Department added to the employees_db database.')
        })
    }

    addDepartment (data) {
        console.log(data);
        const sql = `UPDATE department SET name = ? WHERE id = ?`;

    }

    addRole (data) {
        console.log(data);
        const sql = `UPDATE department SET name = ? WHERE id = ?`;

    }
}
