const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./routes/users');
const notes = require('./routes/notes');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares

app.use(cors());
app.use(express.json());
//routes
app.use('/api/users', users);
app.use('/api/notes', notes);
//app.get('/api/users', (req, res) => res.send('Users Routes'));
//app.get('/api/notes', (req, res) => res.send('Notes Routes'));

module.exports  = app;