const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const beritaController = require('./controllers/berita.controllers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const dusunRoutes = require('./routes/dusunRoutes');
const pendudukRoutes = require('./routes/pendudukRoute');
const agendaRoutes = require('./routes/agenda');
const pemerintahRoutes = require('./routes/pemerintah');
const organisasiRoutes = require('./routes/organisasi');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'cover') {
            cb(null, 'upload/cover/');
        } else if (file.fieldname === 'file') {
            cb(null, 'upload/file/');
        } else {
            cb(null, 'upload/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }]);
app.post('/create', upload, beritaController.createBerita);
app.get('/berita',beritaController.findAllBerita);
app.get('/berita/:id', beritaController.findBeritaById);

app.use('/api', dusunRoutes);
app.use('/api', pendudukRoutes);
app.use('/api', agendaRoutes);
app.use('/api', pemerintahRoutes);
app.use('/api', organisasiRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
