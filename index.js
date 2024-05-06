const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const beritaController = require('./controllers/berita.controllers');
const pengumumanController = require('./controllers/pengumuman.controllers')
const laporanAgendaController = require('./controllers/laporanAgenda.controllers')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/images/cover', express.static(path.join(__dirname, 'upload/cover')));
app.use('/images/file', express.static(path.join(__dirname, 'upload/file')));
app.use('/images/pengumuman/file', express.static(path.join(__dirname, 'upload/pengumuman/file')));
app.use('/images/pengumuman/cover', express.static(path.join(__dirname, 'upload/pengumuman/cover')));
app.use('/images/laporan/dokumentasi', express.static(path.join(__dirname, 'upload/laporan/dokumentasi')));

const dusunRoutes = require('./routes/dusunRoutes');
const pendudukRoutes = require('./routes/pendudukRoute');
const agendaRoutes = require('./routes/agenda');
const pemerintahRoutes = require('./routes/pemerintah');
const organisasiRoutes = require('./routes/organisasi');
const bantuanRoutes = require('./routes/bantuan');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'cover') {
            cb(null, 'upload/cover/');
        } else if (file.fieldname === 'file') {
            cb(null, 'upload/file/');
        }
        else if (file.fieldname === 'file_pengumuman') {
            cb(null, 'upload/pengumuman/file');
        }
        else if (file.fieldname === 'cover_pengumuman') {
            cb(null, 'upload/pengumuman/cover');
        }
        else if (file.fieldname === 'dokumentasi') {
            cb(null, 'upload/laporan/dokumentasi');
        } else {
            cb(null, 'upload/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }, { name: 'file_pengumuman', maxCount: 1 }, { name: 'cover_pengumuman', maxCount: 1 },{name: 'dokumentasi', maxCount:5}]);


app.post('/api/create', upload, beritaController.createBerita);
app.get('/api/berita', beritaController.findAllBerita);
app.get('/api/berita/:id', beritaController.findBeritaById);
app.put('/api/berita/:id', upload, beritaController.editBerita);

//pengumuman
app.post('/api/create/pengumuman', upload, pengumumanController.createPengumuman);
app.get('/api/pengumuman', pengumumanController.findAllPengumuman);
app.get('/api/pengumuman/:id', pengumumanController.findPengumumanById);
app.put('/api/pengumuman/:id', upload, pengumumanController.editPengumuman);
//end-pengumuman

//laporan
app.post('/api/agenda/laporan', upload, laporanAgendaController.createLaporan);
app.get('/api/agenda/laporan', laporanAgendaController.findAllLaporan);
app.get('/api/agenda/laporan/:id', laporanAgendaController.findaLaporanById);

//end-laporan

app.use('/api', dusunRoutes);
app.use('/api', pendudukRoutes);
app.use('/api', agendaRoutes);
app.use('/api', pemerintahRoutes);
app.use('/api', organisasiRoutes);
app.use('/api', bantuanRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
