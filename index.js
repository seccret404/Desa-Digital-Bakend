const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const dusunRoutes = require('./routes/dusunRoutes');
const pendudukRoutes = require('./routes/pendudukRoute');
app.use('/api', dusunRoutes);
app.use('/api', pendudukRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
