const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const organisasiController = require('./controllers/organisasi.controllers')
const pemerintahController = require('./controllers/pemerintah.controllers')
const beritaController = require('./controllers/berita.controllers');
const profileController = require('./controllers/profile.controllers');
const pengumumanController = require('./controllers/pengumuman.controllers')
const laporanAgendaController = require('./controllers/laporanAgenda.controllers')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/images/cover', express.static(path.join(__dirname, 'upload/cover')));
app.use('/images/organisasi', express.static(path.join(__dirname, 'upload/organisasi')));
app.use('/images/pemerintah', express.static(path.join(__dirname, 'upload/pemerintah')));
app.use('/images/profile', express.static(path.join(__dirname, 'upload/profile')));
app.use('/images/file', express.static(path.join(__dirname, 'upload/file')));
app.use('/images/pengumuman/file', express.static(path.join(__dirname, 'upload/pengumuman_file')));
app.use('/images/pengumuman/cover', express.static(path.join(__dirname, 'upload/pengumuman_cover')));
app.use('/images/dokumentasi', express.static(path.join(__dirname, 'upload/laporan/dokumentasi')));

const dusunRoutes = require('./routes/dusunRoutes');
const pendudukRoutes = require('./routes/pendudukRoute');
const agendaRoutes = require('./routes/agenda');
const organisasiRoutes = require('./routes/organisasi');
const bantuanRoutes = require('./routes/bantuan');
const penerimaBantuanRoutes = require('./routes/penerima');
const tugasRoutes = require('./routes/tugas');
const anggaranRoutes = require('./routes/apbdes');
const authRoutes = require('./routes/auth');
const { initializeUsers } = require('./models/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'cover') {
            cb(null, 'upload/cover/');
        } else if (file.fieldname === 'file') {
            cb(null, 'upload/file/');
        }
        else if (file.fieldname === 'file_pengumuman') {
            cb(null, 'upload/pengumuman_file');
        }else if (file.fieldname === 'gambar_desa') {
            cb(null, 'upload/profile');
        }
        else if (file.fieldname === 'cover_pengumuman') {
            cb(null, 'upload/pengumuman_cover');
        }
        else if (file.fieldname === 'logo_organisasi') {
            cb(null, 'upload/organisasi');
        }
        else if (file.fieldname === 'profil') {
            cb(null, 'upload/pemerintah');
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

const upload = multer({ storage: storage }).fields([
    { name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 },
    { name: 'profil', maxCount: 1 }, { name: 'file_pengumuman', maxCount: 1 },
    { name: 'gambar_desa', maxCount: 1 }, { name: 'cover_pengumuman', maxCount: 1 },
    {name: 'dokumentasi', maxCount:5},{ name: 'logo_organisasi', maxCount: 1 }]);

    app.get('/', (req, res) => {
        res.send('API is working');
    });
    app.get('/api/berita_cover/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'upload/cover', filename);
        res.sendFile(filePath);
    });

    app.get('/api/pengumuman_file/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'upload/pengumuman_file', filename);
        res.sendFile(filePath);
    });
    app.get('/api/gambardesa/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'upload/profile', filename);
        res.sendFile(filePath);
    });
    app.get('/api/pengumuman_cover/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'upload/pengumuman_cover', filename);
        res.sendFile(filePath);
    });
    
    app.get('/api/dokumentasi/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'upload/laporan/dokumentasi', filename);
        res.sendFile(filePath);
    });

//organisasi
app.get('/api/organisasi', organisasiController.findAll );
app.get('/api/organisasi/:id', organisasiController.findById );
app.post('/api/organisasi', upload, organisasiController.create );
app.put('/api/organisasi/:id', upload, organisasiController.editOrganisasi );
//end-organisasi


//pemerinthan
app.get('/api/pemerintah', pemerintahController.findAllPemerintah);
app.get('/api/pemerintah/:id', pemerintahController.findPemerintahById);
app.put('/api/pemerintah/:id',upload, pemerintahController.editPemerintah);
app.post('/api/pemerintah',upload, pemerintahController.createPemerintah);
//end;pemerintha

//profile
app.get('/api/profile',profileController.findAllProfile);
app.post('/api/profile', upload, profileController.createProfile);
app.get('/api/profil/:id', profileController.findById);
app.put('/api/profile/:id', upload, profileController.editProfil);
//ennd-profil

app.post('/api/create', upload, beritaController.createBerita);
app.get('/api/berita', beritaController.findAllBerita);
app.get('/api/berita/:id',   beritaController.findBeritaById);
app.put('/api/berita/:id', upload, beritaController.editBerita);
app.delete('/api/berita/:id', beritaController.deleteBerita);


//pengumumanan
app.post('/api/create/pengumuman', upload, pengumumanController.createPengumuman);
app.get('/api/pengumuman', pengumumanController.findAllPengumuman);
app.get('/api/pengumuman/:id', pengumumanController.findPengumumanById);
app.put('/api/pengumuman/:id', upload, pengumumanController.editPengumuman);
app.delete('/api/pengumuman/:id', pengumumanController.deleteBPengumuman);


//end-pengumuman

//laporan
app.post('/api/agenda/laporan', upload, laporanAgendaController.createLaporan);
app.get('/api/agenda/laporan', laporanAgendaController.findAllLaporan);
app.get('/api/agenda/laporan/:id', laporanAgendaController.findaLaporanById);
app.put('/api/agenda/laporan/:id', upload,laporanAgendaController.updateLaporan);

//end-laporan
app.use('/api', authRoutes);
app.use('/api', dusunRoutes);
app.use('/api', pendudukRoutes);
app.use('/api', agendaRoutes);
app.use('/api', organisasiRoutes);
app.use('/api', bantuanRoutes);
app.use('/api', penerimaBantuanRoutes);
app.use('/api', tugasRoutes);
app.use('/api', anggaranRoutes);

const port = process.env.PORT || 3000;
initializeUsers().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});