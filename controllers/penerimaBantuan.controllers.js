const Penerima = require('../models/penerima_bantuan');

exports.findAll = (req, res) =>{
     Penerima.findAll((err,data) =>{
          if(err){
               res.status(500).sed({
                    message: err.message || "Terjadi kesalahan dalam mengambil data"
               });
          }else{
               res.send(data);
          }
     });
}

exports.create = (req, res) => {
     console.log("Data yang diterima:", req.body);
     const newPenerima = new Penerima(req.body.id_penduduk, req.body.id_bantuan, req.body.nama_penerima, req.body.jenis_bantuan, req.body.nama_bantuan, req.body.tgl_terima, req.body.jumlah_terima, req.body.status_bantuan);
     console.log("Objek yang dibuat:", newPenerima);
 
     Penerima.create(newPenerima, (err, data) => {
         if (err) {
             console.error("Error:", err);
             res.status(500).send({
                 message: err.message || "Gagal Create data"
             });
         } else {
             console.log("Data berhasil dibuat:", data);
             res.send(data);
         }
     });
 };
 
 