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

// prompt user using inquirer to gather info about the development team members — creating objects for each team member using classes in lib/ as blueprints — then add each employee to [team]:
const team = [];

// when user starts the application prompt for team manager’s:
// * Name
// * Employee ID
// * Email address
// * Office number
const init = () => {
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
          if (!isNaN(value) && value.length > 0) {
            return true;
          } else {
            return "Please enter a valid employee ID";
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
            return "Please enter a valid email address";
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: function (value) {
          if (!isNaN(value) && value.length > 0) {
            return true;
          } else {
            return "Please enter a valid office number";
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
      addEmployeeMenu();
    });
};

// * When a user enters those requirements then the user is presented with a menu with the option to:
// * Add an engineer
// * Add an intern
// * Finish building the team

const validateEmail = (value) => value.indexOf("@") > -1;
const validateID = (value) => !isNaN(value);

const addEmployee = (employeeType) => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is the ${employeeType}'s name?`,
      },
      {
        type: "input",
        name: "id",
        message: `What is the ${employeeType}'s employee ID?`,
        validate: validateID,
      },
      {
        type: "input",
        name: "email",
        message: `What is the ${employeeType}'s email address?`,
        validate: validateEmail,
      },
      {
        type: "input",
        name: "github",
        message: `What is the ${employeeType}'s GitHub username?`,
        when: (answers) => employeeType === "engineer",
      },
      {
        type: "input",
        name: "school",
        message: `What is the ${employeeType}'s school?`,
        when: (answers) => employeeType === "intern",
      },
    ])
    .then((answers) => {
      if (employeeType === "engineer") {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        team.push(engineer);
      } else if (employeeType === "intern") {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        team.push(intern);
      }
      addEmployeeMenu();
    });
};

const addEmployeeMenu = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "addEmployeeChoice",
          message: "What would you like to do?",
          choices: [
            "Add an engineer",
            "Add an intern",
            "Finish building the team",
          ],
          default: "Finish building the team",
        },
      ])
      .then((answers) => {
        switch (answers.addEmployeeChoice) {
          case "Add an engineer":
            addEmployee("engineer");
            break;
          case "Add an intern":
            addEmployee("intern");
            break;
          case "Finish building the team":
            // Generate the team HTML file
            fs.writeFileSync(outputPath, render(team), "utf-8");
            console.log("Team HTML file generated successfully!");
            break;
        }
      });
  };
  

init();
