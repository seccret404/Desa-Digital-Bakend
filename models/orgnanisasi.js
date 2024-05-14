const db = require('../config/database');

class Organisasi{
     constructor(nama_lembaga,singkatan,alamat_organisasi,tahun_berdiri,ketua,wakil_ketua,sekretaris,bendahara,logo_organisasi,jumlah_anggota, createdAt = new Date(), updatedAt = new Date()){
          this.nama_lembaga = nama_lembaga,
          this.singkatan = singkatan,
          this.alamat_organisasi = alamat_organisasi,
          this.tahun_berdiri = tahun_berdiri,
          this.ketua =ketua,
          this. wakil_ketua =wakil_ketua,
          this.sekretaris = sekretaris,
          this.bendahara = bendahara,
          this.logo_organisasi =logo_organisasi,
          this.jumlah_anggota = jumlah_anggota,
          this.createdAt = createdAt,
          this.updatedAt = updatedAt;
     }

     static findAll(result) {
          db.query("SELECT * FROM organisasis", (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, res);
          });
     }

     static create(newOrganisasi, result) {
          db.query("INSERT INTO organisasis SET ?", newOrganisasi, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newOrganisasi });
          });
     }
     
     static findById(id, result) {
          db.query(`SELECT * FROM organisasis WHERE id = ${id}`, (err, res) => {
              if (err) {
                  result(err, null);
                  return;
              }
  
              if (res.length) {
                  result(null, res[0]);
                  return;
              }
  
              result({ message: "Organisasi not found" }, null);
          });
      }
}

module.exports = Organisasi;