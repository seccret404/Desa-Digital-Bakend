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
     if (!req.body) {
         res.status(400).send({
             message: "Content can not be empty!"
         });
         return;
     }
 
     const newAgenda = new Agenda(req.body.nama_kegiatan, req.body.tanggal_kegiatan,req.body.lokasi,req.body.tujuan,req.body.deskripsi,req.body.status_laporan,req.body.gambar_kegiatan);
 
     Dusun.create(newAgenda, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Dusun."
             });
         } else {
             res.send(data);
         }
     });
 };