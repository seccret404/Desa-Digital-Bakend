const db = require("../../models");
const Penduduk = db.Penduduk;

exports.create = (req, res) => {
     const { nik, nama, tanggal_lahir, tempat_lahir, agama, jenis_kelamin, alamat, pekerjaan, status_hidup, kewarganegaraan, status_perkawinan, no_kk, pendidikan_terakhir, id_dusun } = req.body;

     //Validasi NIK
     const changeNik = String(nik);
     if (!nik || changeNik.length !== 12 || isNaN(parseInt(changeNik))) {
          return res.status(400).json({ message: "NIK tidak bisa kosong dna Harun integer" });
     }

     const newPenduduk = {
          nik,
          nama,
          tanggal_lahir,
          tempat_lahir,
          agama,
          jenis_kelamin,
          alamat,
          pekerjaan,
          status_hidup,
          kewarganegaraan,
          status_perkawinan,
          no_kk,
          pendidikan_terakhir,
          id_dusun
     };

     Penduduk.create(newPenduduk)
          .then(data => {
               res.status(201).json(data);
          })
          .catch(err => {
               res.status(500).json({
                    message: err.message || "Cannot create data"
               });
          });
};


exports.findAll = (req, res) => {
     const { nik, nama, tanggal_lahir, tempat_lahir, agama, jenis_kelamin, alamat, pekerjaan, status_hidup, kewarganegaraan, status_perkawinan, no_kk, pendidikan_terakhir, id_dusun } = req.query;

     Penduduk.findAll({})
          .then(data => {
               res.send(data);
          })
          .catch(err => {
               res.status(500).send({
                    message:
                         err.message || "Cant load data"
               });
          });
}

exports.findOne = (req, res) => {
     const id = req.params.id

     Penduduk.findByPk(id)
          .then(data => {
               if (data) {
                    res.send(data);
               } else {
                    res.status(404).send({
                         message: "Error to get data"
                    });
               }
          })
          .catch(err => {
               res.status(500).send({
                    message: "Error"
               });
          });
}

exports.update = (req, res) => {
     const id = req.params.id;

     Penduduk.update(req.body, {
          where: { id: id }
     })
          .then(num => {
               if (num == 1) {
                    res.send({
                         message: "Success to update"
                    })
               } else {
                    res.send({
                         message: "Failed to upadate"
                    })
               }
          })
          .catch(err => {
               res.status(500).send({
                    message: "Err to update" + id
               });
          });
};
