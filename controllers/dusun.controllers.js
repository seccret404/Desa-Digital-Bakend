const Dusun = require('../models/dusun');

exports.findAll = (req, res) => {
    Dusun.findAll((err, data) => {
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
 
     const newDusun = new Dusun(req.body.nama_ketua, req.body.nama_dusun);
 
     Dusun.create(newDusun, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Dusun."
             });
         } else {
             res.send(data);
         }
     });
 };
 
