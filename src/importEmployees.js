const mongoose = require('mongoose');
const Employee = require('./Employee'); // Importieren Sie Ihr Mongoose-Modell

// Verbindung zur MongoDB herstellen
mongoose.connect('mongodb://mongodb:27017/employees');

const employeesData = [
    { name: "Max Mustermann", personalNumber: 12345, chipNumber: 54321 },
    { name: "Maria Musterfrau", personalNumber: 67891, chipNumber: 56198 },
    { name: "Peter Peters", personalNumber: 53564, chipNumber: 54321 },
    { name: "Moritz Müller", personalNumber: 62489, chipNumber: 65498 },
    { name: "Sascha Schmidt", personalNumber: 75624, chipNumber: 78254 }
];

// Funktion zum Importieren der Daten
async function importData() {
    try {
        await Employee.deleteMany(); // Löschen Sie alle vorhandenen Daten
        await Employee.insertMany(employeesData); // Einfügen der neuen Daten
        console.log('Daten erfolgreich importiert!');
        mongoose.connection.close(); // Schließen Sie die Verbindung zur Datenbank
    } catch (error) {
        console.error('Fehler beim Importieren der Daten:', error);
        mongoose.connection.close();
    }
}

importData();
