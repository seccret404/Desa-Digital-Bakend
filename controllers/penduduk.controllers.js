const Penduduk = require('../models/penduduk');

exports.findAll = (req,res) =>{
     Penduduk.findAll((err, data) =>{
          if(err){
               res.status(500).send({
                    message: err.message || "cant load data"
               });
          }else{
               res.send(data);
          }
     })
}

exports.create = (req,res) =>{
     if(!req.body){
          res.status(400).send({
               message: "Content can't empty!"
          });
          return;
     }
     const newPenduduk = new Penduduk(
          req.body.nik,
          req.body.nama,
          req.body.agama,
          req.body.alamat,
          req.body.tanggal_lahir,
          req.body.tempat_lahir,
          req.body.jenis_kelamin,
          req.body.pekerjaan,
          req.body.kewarganegaraan, 
          req.body.pendidikan,
          req.body.status_hidup,
          req.body.status_perkawinan,
          req.body.dusun,
          req.body.no_kk,
          req.body.id_dusun,
    );
    Penduduk.create(newPenduduk,(err, data) =>{
     if(err){
          res.status(500).send({
               message: err.message || "err when add data"
          });
     }else{
          res.send(data);
     }
    })


}