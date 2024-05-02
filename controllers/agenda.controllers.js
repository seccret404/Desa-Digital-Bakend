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
    const { nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan } = req.body;

     
 
    const newAgenda = new Agenda(nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan);
 
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
