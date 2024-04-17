const db = require('../config/database');

class Agenda{
     constructor(nama_kegiatan,tanggal_kegiatan,lokasi,tujuan,deskripsi,status_laporan,createdAt = new Date() ){
          this.nama_kegiatan = nama_kegiatan,
          this.tanggal_kegiatan = tanggal_kegiatan,
          this.lokasi =lokasi,
          this.tujuan =tujuan,
          this.deskripsi =deskripsi,
          this.status_laporan =status_laporan,
          this.createdAt =createdAt
     }

     static findAll(result) {
          db.query("SELECT * FROM agenda", (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, res);
          });
     }

     static create(newAgenda, result) {
          db.query("INSERT INTO agenda SET ?", newAgenda, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newAgenda });
          });
     }
}