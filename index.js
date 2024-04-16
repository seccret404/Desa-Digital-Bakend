const express = require('express');
const User = require('./models/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('App listening on port 3000!'));
