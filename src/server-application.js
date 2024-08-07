const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const host = 'localhost';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public', 'application')));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server-Applikation läuft auf http://${host}:${port}`);
});