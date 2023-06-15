const inquirer = require('inquirer');
const dataManager = require('./Models/index');
const db = require('./db/connection.js');

const questions = [
    {
        type: 'checkbox',
        name: 'questionOne',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all Roles',
            'View all Employess',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    }
];

const departmentQuestion = [
    {
        type: 'input',
        name: 'newName',
        message: 'What is the name of the new department?'
    }
];

const roleQuestions = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department the new role belongs to?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?'
    }
];

const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'first',
        message: 'What is the first name of the new employee?'
    },
    {
        type: 'input',
        name: 'last',
        message: 'What is the last name of the new employee?'
    },
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department the employee belongs to?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role of the employee?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is their salary?'
    },
    {
        type: 'input',
        name: 'first',
        message: 'Who is their manager?'
    }
];

const init = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            if (answers.questionOne[0] !== 'Exit') {
                if (answers.questionOne[0] === 'View all departments') {
                    displayDepartments(answers.questionOne[0]);
                    return init();
                };
                if (answers.questionOne[0] === 'View all Roles') {
                    displayRoles(answers.questionOne[0]);
                    return init();
                };
                if (answers.questionOne[0] === 'View all Roles') {
                    displayEmployees(answers.questionOne[0]);
                    return init();
                };
                if (answers.questionOne[0] === 'Add a Department') {
                    inquirer.prompt(departmentQuestion)
                        .then((answers) => {
                            addDepartment(answers);
                        });
                    
                    return init();
                };
                if (answers.questionOne[0] === 'Add a Role') {
                    inquirer.prompt(roleQuestions)
                        .then((answers) => {
                            addRole(answers);
                        });
                    
                    return init();
                };
            } else {
                console.log('Thanks! Goodbye!');
            }
        });
};

init();