const db = require('../config/database');

class Agenda{
     constructor(nama_kegiatan,tanggal_kegiatan,lokasi,tujuan_kegiatan,deskripsi_kegiatan,status_laporan,updatedAt = new Date(),createdAt = new Date() ){
          this.nama_kegiatan = nama_kegiatan,
          this.tanggal_kegiatan = tanggal_kegiatan,
          this.lokasi =lokasi,
          this.tujuan_kegiatan =tujuan_kegiatan,
          this.deskripsi_kegiatan =deskripsi_kegiatan,
          this.status_laporan =status_laporan,
          this.createdAt =createdAt,
          this.updatedAt = updatedAt
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

     static create(newAgenda, result) {
          db.query("INSERT INTO agendas SET ?", newAgenda, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newAgenda });
          });
     }
}

module.exports = Agenda;