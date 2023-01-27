// local dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// external dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// generated output
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// template
const render = require("./src/page-template.js");

// prompt user using `inquirer` to gather info about the development team members — creating objects for each team member using classes in lib/ as blueprints — then add each employee to [team]:
const team = [];

// when user starts the application prompt for team manager’s:
//   * Name
//   * Employee ID
//   * Email address
//   * Office number
const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the team manager's employee ID?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the team manager's email address?",
        validate: function (value) {
          if (value.indexOf("@") > -1) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((managerAnswers) => {
      const manager = new Manager(
        managerAnswers.name,
        managerAnswers.id,
        managerAnswers.email,
        managerAnswers.officeNumber
      );
      team.push(manager);
      addEmployee();
    });
};

// * When a user enters those requirements then the user is presented with a menu with the option to:
//   * Add an engineer
//   * Add an intern
//   * Finish building the team

// * When a user selects the **engineer** option then a user is prompted to enter the following and then the user is taken back to the menu:
//   * Engineer's Name
//   * ID
//   * Email
//   * GitHub username
// * When a user selects the intern option then a user is prompted to enter the following and then the user is taken back to the menu:
//   * Intern’s name
//   * ID
//   * Email
//   * School
// * When a user decides to finish building their team then they exit the application, and the HTML is generated.

// * Call the `render` function (provided for you) and pass in an array containing all employee objects;
// * The `render` function will generate and return a block of HTML including templated divs for each employee!
// * Create an HTML file using the HTML returned from the `render` function.
// * Write it to a file named `team.html` in the `output` folder.
// * You can use the provided variable `outputPath` to target this location.
