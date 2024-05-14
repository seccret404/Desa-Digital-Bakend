const Tugas  = require('../models/tugaswewenang')

exports.findAll = (req, res)=>{
     Tugas.findAll((err, data) =>{
          if(err){
               res.status(500).send({
                    message: err.message || "error to get data"
               });
          }else{
               res.send(data);
          }
     })
}

exports.create = (req, res) => {
     if (!req.body || !req.body.jabatan || !req.body.wewenang || !req.body.fungsi) {
         return res.status(400).send({
             message: "All fields are required."
         });
     }
 
     const newTugas = new Tugas(
         req.body.jabatan,
         req.body.tugas,
         req.body.wewenang,
         req.body.fungsi
     );
 
     Tugas.create(newTugas, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating tugas."
             });
         } else {
             res.send(data);
         }
     });
 }
 


exports.findById = (req, res) => {
     Tugas.findById(req.params.id, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found Tugas with id ${req.params.id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Error retrieving Tugas with id " + req.params.id
                 });
             }
         } else res.send(data);
     });
 };
 exports.update = (req, res) => {
     const id = req.params.id;
 
     if (!req.body) {
         return res.status(400).send({
             message: "Data to update can not be empty!"
         });
     }
 
     Tugas.updateById(id, new Tugas(
         req.body.jabatan,
         req.body.tugas,
         req.body.wewenang,
         req.body.fungsi
     ), (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found Tugas with id ${id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Error updating Tugas with id " + id
                 });
             }
         } else res.send(data);
     });
 };
 