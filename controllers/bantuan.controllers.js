const Bantuan = require('../models/bantuan');

exports.findAll = (req, res)=>{
     Bantuan.findAll((err, data)=>{
          if(err){
               res.status(500).send({
                    message: err.message || "Error broh"
               });
          } else {
               res.send(data);
          }
     });

};

exports.create = (req, res) =>{
     const newBantuan = new Bantuan(
          req.body.jenis_bantuan,
          req.body.nama_bantuan,
     );
     console.log("Data yang diterima:", req.body);
    
     Bantuan.create(newBantuan, (err,data) => {
          if(err){
               res.status(500).send({
                    message: err.message || "Error broh to add data"
               });
          } else{
               res.send(data);
          }
     });
}

exports.delete = (req, res) => {
     Bantuan.remove(req.params.id, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Not found bantuan with id ${req.params.id}.`
                 });
             } else {
                 res.status(500).send({
                     message: "Could not delete bantuan with id " + req.params.id
                 });
             }
         } else res.send({ message: `bantuan was deleted successfully!` });
     });
 };