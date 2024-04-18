const Agenda = require('../models/agenda');

exports.findAll = (req, res) => {
     Agenda.findAll((err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Terjadi kesalahan saat mengambil data dusun."
             });
         } else {
             res.send(data);
         }
     });
 };

 exports.create = (req, res) => {
    // Periksa apakah semua field yang diperlukan ada
    const { nama_kegiatan, tanggal_kegiatan, lokasi, tujuan, deskripsi, status_laporan, gambar_kegiatan } = req.body;

    if (!nama_kegiatan || !tanggal_kegiatan || !lokasi || !tujuan || !deskripsi || !status_laporan || !gambar_kegiatan) {
        res.status(400).send({
            message: "Semua field harus diisi!"
        });
        return;
    }
 
    const newAgenda = new Agenda(nama_kegiatan, tanggal_kegiatan, lokasi, tujuan, deskripsi, status_laporan, gambar_kegiatan);
 
    Agenda.create(newAgenda, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Dusun."
            });
        } else {
            res.send(data);
        }
    });
};
