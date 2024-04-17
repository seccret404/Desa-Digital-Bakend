const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const dusunRoutes = require('./routes/dusunRoutes');
app.use('/api/dusun', dusunRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
