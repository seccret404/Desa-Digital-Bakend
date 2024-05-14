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
     const newPenerima = new Penerima(req.body.id_penduduk, req.body.id_bantuan, req.body.nama_penerima, req.body.jenis_bantuan, req.body.nama_bantuan, req.body.tgl_terima, req.body.jumlah_terima, req.body.status_bantuan, req.body.bentuk_terima);
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
 
 exports.findById = async (req, res) => {
     const id = req.params.id;
 
     try {
         const penerima = await Penerima.findById(id);
         res.send(penerima);
     } catch (error) {
         res.status(500).send({
             message: error.message || "Terjadi kesalahan saat mengambil data penerima."
         });
     }
 };
 exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const penerima = new Penerima(
        req.body.id_penerima,
        req.body.id_bantuan,
        req.body.nama_penerima,
        req.body.jenis_bantuan,
        req.body.nama_bantuan,
        req.body.tgl_terima,
        req.body.jumlah_terima,
        req.body.status_bantuan,
        req.body.bentuk_terima
    );

    Penerima.update(id, penerima, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found PB with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating PB with id " + id
                });
            }
        } else res.send(data);
    });
};
