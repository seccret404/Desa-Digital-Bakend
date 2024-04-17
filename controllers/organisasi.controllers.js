const Organisasi = require('../models/orgnanisasi');

exports.findAll = (req, res) => {
     Organisasi.findAll((err, data) => {
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
 
     const newOrganisasi = new Organisasi(req.body.nama_lembaga,req.body.singkatan,req.body.alamat_organisasi,req.body.tahun_berdiri,req.body.ketua,req.body.wakil_ketua,req.body.sekretaris,req.body.bendahara,req.body.logo,req.body.jumlah_anggota);
 
     Organisasi.create(newOrganisasi, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Dusun."
             });
         } else {
             res.send(data);
         }
     });
 };