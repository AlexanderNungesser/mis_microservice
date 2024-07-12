const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    personalNumber: Number,
    chipNumber: Number,
    status: {
        type: String,
        default: 'ausgestempelt',
    },
    history: {
        type: [
            {
                status: String,
                timestamp: String,
            },
        ],
        default: [],
    },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
