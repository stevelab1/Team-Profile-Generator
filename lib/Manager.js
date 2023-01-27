// define and export the Manager class. Extends Employee:
const Employee = require("./Employee");

// Extends Employee:
    // * `officeNumber`
    // * `getRole()` overridden to return `'Manager'`

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;