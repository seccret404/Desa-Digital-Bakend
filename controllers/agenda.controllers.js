const Agenda = require('../models/agenda');

exports.findAll = (req, res) => {
     Agenda.findAll((err, data) => {
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
    const { nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan } = req.body;
 
    const newAgenda = new Agenda(nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan);
 
    Agenda.create(newAgenda, (err, data) => {
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
    const id = req.params.id;

    Agenda.findById(id, (err, data) => {
        if (err) {
            if (err.message === "Agenda not found") {
                res.status(404).send({
                    message: `Agenda with id ${id} not found`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Agenda with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan } = req.body;

    const agenda = new Agenda(nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan);

    Agenda.update(id, agenda, (err, data) => {
        if (err) {
            if (err.message === "Agenda not found") {
                res.status(404).send({
                    message: `Agenda with id ${id} not found`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Agenda with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};

