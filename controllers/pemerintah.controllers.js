const Pemerintah = require('../models/pemerintahan');

exports.findAllPemerintah = (req, res)=>{
    Pemerintah.findAll((err, data) =>{
         if(err){
              res.status(500).send({
                   message: err.message || "Terjadi Kesalahan meganbil data"
              });
         }else{
              res.send(data);
         }
    });
}


exports.createPemerintah = (req, res)=>{
    console.log("Data yang dikirimkan : ", req.body);
    console.log("Data yang dikirimkan: ", req.files);
    if (!req.files || !req.files['profil'] || !req.files['profil'][0]) {
         return res.status(400).send({
             message: "profil desa tidak ditemukan"
         });
     }
    const newPemerintah = new Pemerintah(
         req.body.nama,
         req.body.nik,
         req.body.jabatan,  
         req.files['profil'][0].filename,
         req.body.tahun_mulai,
         req.body.tahun_selesai
       
    );

    Pemerintah.create(newPemerintah,(err,data)=>{
         if(err){
              res.status(500).send({
                   message: err.message || "Error add data"
              });

         }else{
              res.send(data);
         }
    })
}

exports.findPemerintahById = (req, res) => {
    Pemerintah.findById(req.params.id, (err, data) => { 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pemerintah dengan id ${req.params.id} tidak ditemukan.`
                });
            } else {
                res.status(500).send({
                    message: `Pemerintah retrieving pemerintah with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};
exports.editPemerintah = (req, res) => {
    console.log("Data yang diterima untuk diedit:", req.body);
    console.log("Data yang dikirim:", req.files);

    if (!req.files || !req.files['profil'] || !req.files['profil'][0]) {
        return res.status(400).send({
            message: "Profil desa tidak ditemukan"
        });
    }

    const { profil } = req.files || {};
    const newPemerintah = new Pemerintah(
        req.body.nama,
        req.body.nik,
        req.body.jabatan,
        req.files && req.files['profil'] ? req.files['profil'][0].filename : null,
        req.body.tahun_mulai,
        req.body.tahun_selesai
    );

    Pemerintah.update(req.params.id, newPemerintah, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Pemerintah dengan id ${req.params.id} tidak ditemukan.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating pemerintah with id ${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};