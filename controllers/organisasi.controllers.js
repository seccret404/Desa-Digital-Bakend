const Organisasi = require('../models/orgnanisasi');

exports.findAll = (req, res) => {
     Organisasi.findAll((err, data) => {
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
    console.log("Data yang diterima untuk diedit:", req.body);
    console.log("Data yang dikirim:", req.files);
     if (!req.body) {
         res.status(400).send({
             message: "Content can not be empty!"
         });
         return;
     }
 
     const newOrganisasi = new Organisasi(
        req.body.nama_lembaga,req.body.singkatan,
        req.body.alamat_organisasi,req.body.tahun_berdiri,
        req.body.ketua,req.body.wakil_ketua,
        req.body.sekretaris,req.body.bendahara,
        req.files && req.files['logo_organisasi'] ? req.files['logo_organisasi'][0].filename : null,
        req.body.jumlah_anggota,req.body.deskripsi,);
 
     Organisasi.create(newOrganisasi, (err, data) => {
         if (err) {
             res.status(500).send({
                 message: err.message || "Some error occurred while creating the Dusun."
             });
         } else {
             res.send(data);
         }
     });
 };

 exports.findById = (req, res) => {
    Organisasi.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Organisasi with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Organisasi with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.editOrganisasi = (req, res) => {
    console.log("Data yang diterima untuk diedit:", req.body);
    console.log("Data yang dikirim:", req.files);
  
    if (!req.body.nama_lembaga || !req.body.ketua) {
      return res.status(400).send({
        message: "Perhatikan field kosong"
      });
    }
  
    const logoOrganisasi = req.files && req.files['logo_organisasi'] ? req.files['logo_organisasi'][0].filename : req.body.logo_organisasi;
  
    const updatedOrganisasi = new Organisasi(
      req.body.nama_lembaga,
      req.body.singkatan,
      req.body.alamat_organisasi,
      req.body.tahun_berdiri,
      req.body.ketua,
      req.body.wakil_ketua,
      req.body.sekretaris,
      req.body.bendahara,
      logoOrganisasi,
      req.body.jumlah_anggota,
      req.body.deskripsi
    );
  
    Organisasi.update(req.params.id, updatedOrganisasi, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            message: `Organisasi dengan id ${req.params.id} tidak ditemukan.`
          });
        } else {
          return res.status(500).send({
            message: `Error updating Organisasi with id ${req.params.id}`
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  