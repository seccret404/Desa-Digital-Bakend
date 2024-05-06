const db = require('../config/database');

class Agenda {
     constructor(nama_kegiatan, tanggal_kegiatan, lokasi, tujuan_kegiatan, deskripsi_kegiatan, status_laporan, updatedAt = new Date(), createdAt = new Date()) {
         this.nama_kegiatan = nama_kegiatan;
         this.tanggal_kegiatan = tanggal_kegiatan;
         this.lokasi = lokasi;
         this.tujuan_kegiatan = tujuan_kegiatan;
         this.deskripsi_kegiatan = deskripsi_kegiatan;
         this.status_laporan = status_laporan;
         this.createdAt = createdAt;
         this.updatedAt = updatedAt;
     }
 
     static findAll(result) {
         db.query("SELECT * FROM agendas", (err, res) => {
             if (err) {
                 result(err, null);
                 return;
             }
             result(null, res);
         });
     }
 
     static findById(id, result) {
         db.query(`SELECT * FROM agendas WHERE id = ${id}`, (err, res) => {
             if (err) {
                 result(err, null);
                 return;
             }
 
             if (res.length) {
                 result(null, res[0]);
                 return;
             }
 
             result({ message: "Agenda not found" }, null);
         });
     }
 
     static create(newAgenda, result) {
         db.query("INSERT INTO agendas SET ?", newAgenda, (err, res) => {
             if (err) {
                 result(err, null);
                 return;
             }
             result(null, { id: res.insertId, ...newAgenda });
         });
     }
 
     static update(id, agenda, result) {
         db.query(
             "UPDATE agendas SET nama_kegiatan = ?, tanggal_kegiatan = ?, lokasi = ?, tujuan_kegiatan = ?, deskripsi_kegiatan = ?, status_laporan = ? WHERE id = ?",
             [agenda.nama_kegiatan, agenda.tanggal_kegiatan, agenda.lokasi, agenda.tujuan_kegiatan, agenda.deskripsi_kegiatan, agenda.status_laporan, id],
             (err, res) => {
                 if (err) {
                     result(err, null);
                     return;
                 }
 
                 if (res.affectedRows == 0) {
                     result({ message: "Agenda not found" }, null);
                     return;
                 }
 
                 result(null, { id: id, ...agenda });
             }
         );
     }
 }
 
 module.exports = Agenda;
 

module.exports = Agenda;