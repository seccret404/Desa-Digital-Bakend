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
 exports.update = (req, res) => {
     const id = req.params.id;
 
     if (!req.body) {
         return res.status(400).send({
             message: "Data to update can not be empty!"
         });
     }
 
     Dusun.updateById(id, new Dusun(req.body.nama_ketua, req.body.nama_dusun), (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found Dusun with id ${id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Error updating Dusun with id " + id
                 });
             }
         } else res.send(data);
     });
 };
 

 exports.findById = (req, res) => {
     Dusun.findById(req.params.id, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found Dusun with id ${req.params.id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Error retrieving Dusun with id " + req.params.id
                 });
             }
         } else res.send(data);
     });
 };

 exports.delete = (req, res) => {
     Dusun.remove(req.params.id, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found Dusun with id ${req.params.id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Could not delete Dusun with id " + req.params.id
                 });
             }
         } else res.send({ message: `Dusun was deleted successfully!` });
     });
 };
 
 
 
