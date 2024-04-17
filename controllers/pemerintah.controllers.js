const Pemerintah = require("../models/pemerintahan");

exports.findAll = (req, res) =>{
     Pemerintah.findAll((err, data) =>{
          if (err) {
               res.status(500).send({
                   message: err.message || "Terjadi kesalahan saat mengambil data dusun."
               });
           } else {
               res.send(data);
           }
     })
}

exports.create = (req, res) => {
     if (!req.body) {
         res.status(400).send({
             message: "Content can not be empty!"
         });
         return;
     }
 
     const newPemerintah = new Pemerintah(req.body.nama, req.body.nik,req.body.jabatan,req.body.tahun_jabatan,req.body.profil);
 
     Pemerintah.create(newPemerintah, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Dusun."
             });
         } else {
             res.send(data);
         }
     });
 };