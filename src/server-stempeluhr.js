const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employee = require('./Employee'); // Importieren Sie Ihr Mongoose-Modell

const app = express();
const port = 3000;
const host = 'localhost';

// Verbindung zur MongoDB herstellen
mongoose.connect('mongodb://localhost:27017/employees');

app.use(cors());
app.use(express.static('public/stempeluhr'));
app.use(express.json());

app.get('/timestamp', async (req, res) => {
    const currentTimestamp = new Date().toISOString();

    // Einen zufälligen Mitarbeiter aus der Datenbank abrufen
    const employees = await Employee.find();
    const randomEmployee =
        employees[Math.floor(Math.random() * employees.length)];
    randomEmployee.status =
        randomEmployee.status === 'ausgestempelt'
            ? 'eingestempelt'
            : 'ausgestempelt';
    randomEmployee.history.push({
        status: randomEmployee.status,
        timestamp: currentTimestamp,
    });
    await randomEmployee.save();

    res.json({
        timestamp: currentTimestamp,
        employee: randomEmployee,
    });
});

app.post('/history', async (req, res) => {
    const { personalNumber } = req.body;

    const employee = await Employee.findOne({ personalNumber: personalNumber });
    if (employee) {
        res.json({ history: employee.history });
    } else {
        res.json({ error: 'Employee not found' });
    }
});

app.listen(port, () => {
    console.log(`Server-Stempeluhr läuft auf http://${host}:${port}`);
});
