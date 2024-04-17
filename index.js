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
const agendaRutes = require('./routes/agenda')
const pemerintahRoutes = require('./routes/pemerintah');
app.use('/api', dusunRoutes);
app.use('/api', pendudukRoutes);
app.use('/api', agendaRutes);
app.use('/api', pemerintahRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
