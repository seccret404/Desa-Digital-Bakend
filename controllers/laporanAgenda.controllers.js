const AgendaModel = require('../models/agenda'); 
const LaporanAgenda = require('../models/laporanAgenda'); 

exports.findAllLaporan = (req, res) =>{
     LaporanAgenda.findAll((err,data) =>{
          if (err) {
               res.status(500).send({
                   message: err.message || "Terjadi kesalahan saat mengambil data laporan."
               });
           } else {
               res.send(data);
           }
     })
}

exports.createLaporan = (req, res) => {
     console.log("Data yang diterima:", req.body);
     console.log("File yang dikirim:", req.files);
 
     if (!req.body.id_agenda || !req.body.jumlah_peserta || !req.body.lokasi_kegiatan || !req.body.donasi || !req.body.tgl_realisasi || !req.body.anggaran_desa || !req.body.status_kegiatan || !req.files['dokumentasi'] || !req.body.koordinator) {
         res.status(400).send({
             message: "Semua data laporan agenda diperlukan."
         });
         return;
     }
     const id_agenda = req.body.id_agenda;
     const { jumlah_peserta, lokasi_kegiatan, donasi, tgl_realisasi, anggaran_desa, status_kegiatan, koordinator } = req.body;
     const dokumentasi = req.files['dokumentasi'].map(file => file.filename); // Menyimpan array nama file
     const newLaporan = new LaporanAgenda(id_agenda, jumlah_peserta, lokasi_kegiatan, donasi, tgl_realisasi, anggaran_desa, status_kegiatan, dokumentasi, koordinator);
     LaporanAgenda.create(newLaporan, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Terjadi kesalahan saat membuat laporan agenda."
             });
         } else {
             res.send(data);
         }
     });
 };
 
 exports.findaLaporanById = (req, res) => {
     LaporanAgenda.findById(req.params.id_agenda, (err, data) => { 
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Laporan dengan id ${req.params.id_agenda} tidak ditemukan.`
                 });
             } else {
                 res.status(500).send({
                     message: `Error retrieving Laporan with id ${req.params.id_agenda}`
                 });
             }
         } else {
             res.send(data);
         }
     });
 };
