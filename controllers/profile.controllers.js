const Profil = require('../models/profildesa')

exports.findAllProfile = (req, res)=>{
     Profil.findAll((err, data) =>{
          if(err){
               res.status(500).send({
                    message: err.message || "Terjadi Kesalahan meganbil data"
               });
          }else{
               res.send(data);
          }
     });
}

exports.createProfile = (req, res)=>{
     console.log("Data yang dikirimkan : ", req.body);
     console.log("Data yang dikirimkan: ", req.files);

     if (!req.files || !req.files['gambar_desa'] || !req.files['gambar_desa'][0]) {
          return res.status(400).send({
              message: "Gambar desa tidak ditemukan"
          });
      }

     const newProfile = new Profil(
          req.body.nama_desa,
          req.body.alamat_kantor,
          req.body.kecamatan,
          req.body.kabupaten,
          req.body.provinsi,
          req.body.profil_singkat,
          req.files['gambar_desa'][0].filename,
          req.body.batas_barat,
          req.body.batas_timur,
          req.body.batas_utara,
          req.body.batas_selatan,
          req.body.visi_desa,
          req.body.misi_desa,
          req.body.sejarah_desa
     );

     Profil.create(newProfile,(err,data)=>{
          if(err){
               res.status(500).send({
                    message: err.message || "Error add data"
               });

          }else{
               res.send(data);
          }
     })
}

exports.findProfilById = (req, res) => {
     Profil.findById(req.params.id, (err, data) => { 
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Profile dengan id ${req.params.id} tidak ditemukan.`
                 });
             } else {
                 res.status(500).send({
                     message: `Profile retrieving Berita with id ${req.params.id}`
                 });
             }
         } else {
             res.send(data);
         }
     });
 };

 
exports.editProfil = (req, res) => {
     console.log("Data yang diterima untuk diedit:", req.body);
     console.log("Data yang dikirim:", req.files);
 
     if (!req.files || !req.files['gambar_desa'] || !req.files['gambar_desa'][0]) {
          return res.status(400).send({
              message: "Gambar desa tidak ditemukan"
          });
      }
   
      const { gambar_desa } = req.files || {};
      const newProfile = new Profil(
          req.body.nama_desa,
          req.body.alamat_kantor,
          req.body.kecamatan,
          req.body.kabupaten,
          req.body.provinsi,
          req.body.profil_singkat,
          gambar_desa[0].filename,
          req.body.batas_barat,
          req.body.batas_timur,
          req.body.batas_utara,
          req.body.batas_selatan,
          req.body.visi_desa,
          req.body.misi_desa,
          req.body.sejarah_desa
     );
 
     Profil.update(req.params.id, newProfile, (err, data) => {
         if (err) {
             if (err.kind === "not_found") {
                 res.status(404).send({
                     message: `Profile dengan id ${req.params.id} tidak ditemukan.`
                 });
             } else {
                 res.status(500).send({
                     message: `Error updating profile with id ${req.params.id}`
                 });
             }
         } else {
             res.send(data);
         }
     });
 };