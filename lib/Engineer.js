// define and export the Engineer class... extends Employee.
const Employee = require("./Employee");

// Extends Employee with:
    // * `github` username
    // * `getGithub()`
    // * `getRole()` overridden to return `'Engineer'`

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    // for now, assuming that other employee roles usually won't want the GitHub link
    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;

