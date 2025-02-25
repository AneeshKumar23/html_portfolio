const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    const newUser = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    const filePath = path.join(__dirname, '../Users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading Users.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to Users.json:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.send('Form submitted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});