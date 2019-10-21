const express = require('express');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sqlTest'
});

const {
    isEmail
} = require('./utils');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.get('/user', (req, res) => {
    const {
        email,
        name
    } = req.query;
    if (email || name) {
        connection.query(`SELECT email, name FROM users WHERE (email REGEXP '${email}') OR (name REGEXP '${name}')`,
        (error, rows, fields) => {
            if (error) return res.json({ error });
            res.json(rows);
        });
    } else res.json({ error: 'request needs email OR name' });
});

app.get('/sign', (req, res) => {
    const {
        email,
        password
    } = req.query;
    if (email && password) {
        connection.query(`SELECT * FROM users WHERE password='${password}' AND email='${email}'`,
        (error, rows, fields) => {
            if (error) return res.json({ error });
            res.json(rows);
        });
    } else res.json({ error: 'request needs password and email' });
});

app.delete('/user', (req, res) => {
    const {
        name,
        password
    } = req.query;
    if (name && password) {
        connection.query(`DELETE FROM users WHERE name='${name}' AND password='${password}'`,
        (error, rows, fields) => {
            if (error) return res.json({ error });
            res.json(rows);
        });
    } else res.json({ error: 'request needs name & password' });
});

app.post('/user', (req, res) => {
    const {
        name,
        email,
        password
    } = req.query;
    if (name && isEmail(email) && password) {
        connection.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`,
        (error, rows, fields) => {
            if (error) return res.json({ error });
            res.json(rows);
        });
    } else res.json({ error: 'request needs name & isEmail(email) & password' });
});

app.put('/user', (req, res) => {
    const {
        name,
        email,
        password        
    } = req.query;
    if (name && isEmail(email) && password) {
        connection.query(`UPDATE users SET email='${email}' WHERE name='${name}' AND password='${password}'`,
        (error, rows, fields) => {
            if (error) return res.json({ error });
            res.json(rows);
        });
    } else res.json({ error: 'request needs name & isEmail(email) & password' });
});

app.listen(5555);