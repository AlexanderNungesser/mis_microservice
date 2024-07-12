const { MongoClient } = require('mongodb');
const Employee = require('./Employee');

const url = 'mongodb://localhost:27017';
const dbName = 'Microservice';

async function insertData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Verbunden mit der Datenbank');

        const db = client.db(dbName);
        const collection = db.collection('employees');

        const employees = [new Employee("Max Mustermann", '12345', '54321'),
            new Employee("Maria Musterfrau", '67891', '56198'),
            new Employee("Peter Peters", '53564', '54321'),
            new Employee("Moritz Müller", '62489', '65498'),
            new Employee("Sascha Schmidt", '75624', '78254')];

        await collection.deleteMany({});
        await collection.insertMany(employees);

        console.log('Beispieldaten eingefügt');
        return true;
    } catch (error) {
        console.error('Fehler beim Einfügen von Beispieldaten:', error);
        return false;
    } finally {
        await client.close();
    }
}

async function readData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Verbunden mit der Datenbank');

        const db = client.db(dbName);
        const collection = db.collection('employees');

        const data = await collection.find({}).toArray();

        console.log('Daten gelesen');
        return data;
    } catch (error) {
        console.error('Fehler beim Lesen von Daten:', error);
        return null;
    } finally {
        await client.close();
    }
}

async function filterDataByPersNum(personalNumber) {
    const data = await readData();

    const filteredData = data.map(user => {
        const filteredContributions = user.dailyContributions.filter(contribution => {
            const dateStr = typeof contribution.date === 'string' ? contribution.date : new Date(contribution.date).toISOString();
            const contributionPersonalNumber = dateStr.slice(0, 7);
            return contributionPersonalNumber === personalNumber;
        });

        return {
            ...user,
            dailyContributions: filteredContributions
        };
    });

    return filteredData.filter(user => user.dailyContributions.length > 0);
}

module.exports = {
    insertData,
    readData,
    filterDataByPersNum
};