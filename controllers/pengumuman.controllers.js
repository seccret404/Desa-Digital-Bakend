const Pengumuman = require('../models/pengumuman');

exports.findAllPengumuman = (req, res) => {
     Pengumuman.findAll((err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Terjadi kesalahan saat mengambil data pengumuman."
             });
         } else {
             res.send(data);
         }
     });
 };
 exports.createPengumuman = (req, res) => {
    
     console.log("Data yang diterima:", req.body);
     console.log("Data yang dikirim:", req.files);
 
     if (!req.body.judul_pengumuman || !req.body.deskripsi_pengumuman || !req.files['cover_pengumuman'] || !req.files['file_pengumuman']) {
         res.status(400).send({
             message: "Field data."
         });
         return;
     }
 
     const newPengumuman = new Pengumuman(
         req.body.judul_pengumuman,
         req.body.deskripsi_pengumuman,
         req.files['cover_pengumuman'][0].filename,
         req.files['file_pengumuman'][0].filename
     );
 
     Pengumuman.create(newPengumuman, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Pengumuman."
             });
         } else {
             res.send(data);
         }
     });
 };
 exports.findPengumumanById = (req, res) => {
     Pengumuman.findById(req.params.id, (err, data) => { 
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Pengumuman dengan id ${req.params.id} tidak ditemukan.`
                 });
             } else {
                 res.status(500).send({
                     message: `Error retrieving Pengumuman with id ${req.params.id}`
                 });
             }
         } else {
             res.send(data);
         }
     });
 };

 
exports.editPengumuman = (req, res) => {
     // Logika untuk mengedit berita
     console.log("Data yang diterima untuk diedit:", req.body);
     console.log("Data yang dikirim:", req.files);
 
     if (!req.body.judul_pengumuman || !req.body.deskripsi_pengumuman) {
         res.status(400).send({
             message: "Judul pengumuman dan deskripsi diperlukan."
         });
         return;
     }
     const { cover_pengumuman, file_pengumuman } = req.files || {};
 
     const updatePengumuman = new Pengumuman(
         req.body.judul_pengumuman,
         req.body.deskripsi_pengumuman,
         req.files && req.files['cover_pengumuman'] ? req.files['cover_pengumuman'][0].filename : null,
         req.files && req.files['file_pengumuman'] ? req.files['file_pengumuman'][0].filename : null
     );
 
     Pengumuman.update(req.params.id, updatePengumuman, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Pengumuman dengan id ${req.params.id} tidak ditemukan.`
                 });
             } else {
                 res.status(500).send({
                     message: `Error updating Pengumuman with id ${req.params.id}`
                 });
             }
         } else {
             res.send(data);
         }
     });
 };

 exports.delete = (req, res) => {
    Pengumuman.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pengumuman with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete pengumuman with id " + req.params.id
                });
            }
        } else res.send({ message: `pengumuman was deleted successfully!` });
    });
};
 