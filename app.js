const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerQuestions = {
    type: "input",
    message: "What is their office number?",
    name: "office"
};

const engineerQuestions = {
    type: "input",
    message: "What is their github username?",
    name: "github"
};

const internQuestions = {
    type: "input",
    message: "What school do they attend?",
    name: "school"
};

const employeeType = [{
    type: "list",
    name: "type",
    message: "Please select the type of employee you woud like to add:",
    choices: ["Manager", "Engineer", "Intern"]
}];

const defaultQs = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
    }];

const moreEmp = [{
    type: "confirm",
    message: "Would you like to add any other employees?",
    name: "continue"
}];

async function getEmployees() {
    // initialize continue variable
    var cont = { "continue": true };
    // var employees = {};
    // initialize incrementing variables
    var i = 0;
    var j = 0;
    var k = 0;
    var managers = [];
    var engineers = [];
    var interns = [];
    try {
        while (cont.continue) {
            var role = await inquirer.prompt(employeeType);
            var defaultAs = await inquirer.prompt(defaultQs);
            // console.log("====" + role.type + "====");
            // get unique data based on type, build object
            if (role.type === "Manager") {
                var office = await inquirer.prompt(managerQuestions);
                managers[i] = new Manager(defaultAs.name, defaultAs.id, defaultAs.email, office.office);
                i++;
            }
            else if (role.type === "Engineer") {
                var github = await inquirer.prompt(engineerQuestions);
                engineers[j] = new Engineer(defaultAs.name, defaultAs.id, defaultAs.email, github.github);
                j++;
            }
            else {
                var school = await inquirer.prompt(internQuestions);
                interns[k] = new Intern(defaultAs.name, defaultAs.id, defaultAs.email, school.school);
                k++;
            }
            cont = await inquirer.prompt(moreEmp);
        }
    } catch (err) {
        console.log(err);
    }
    const employees = {...managers, ...engineers, ...interns};
    // combine responses into object with format readable by htmlRenderer.js
    // var employees = [];
    // for (var i = 0; i < role.length; i++) {
    //     var dummy = {};
    //     employees[i] = Object.assign(dummy, role[i], defaultAs[i], additionalAs[i]); 
    // }
    console.log(employees);
    const html = render(employees);
    console.log(html);
}
getEmployees();
// console.log(employees);
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
