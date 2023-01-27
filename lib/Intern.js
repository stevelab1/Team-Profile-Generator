// define and export the Intern class. Extends Employee.
const Employee = require("./Employee");

// Extends Employee with:
//       * `school`
//       * `getSchool()`
//       * `getRole()` overridden to return `'Intern'`

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;