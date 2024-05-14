const db = require('../config/database');

class Organisasi{
     constructor(nama_lembaga,singkatan,alamat_organisasi,tahun_berdiri = new Date(),ketua,wakil_ketua,sekretaris,bendahara,logo_organisasi,jumlah_anggota,deskripsi, createdAt = new Date(), updatedAt = new Date()){
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
          this.deskripsi=deskripsi;
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

          static update(id, organisasi, result) {
               db.query(
                    "UPDATE organisasis SET nama_lembaga = ?, singkatan = ?, alamat_organisasi = ?, tahun_berdiri = ?, ketua = ?,wakil_ketua = ?,sekretaris = ?, bendahara = ?,logo_organisasi = ?,jumlah_anggota=?,deskripsi=?  WHERE id = ?",
                    [organisasi.nama_lembaga, organisasi.singkatan, organisasi.alamat_organisasi, organisasi.tahun_berdiri, organisasi.ketua,organisasi.wakil_ketua,organisasi.sekretaris,organisasi.bendahara,organisasi.logo_organisasi,organisasi.jumlah_anggota,organisasi.deskripsi, id],
                    (err, res) => {
                         if (err) {
                              result(err, null);
                              return;
                         }
     
                         if (res.affectedRows == 0) {
                              // Berita tidak ditemukan dengan id yang diberikan
                              result({ kind: "not_found" }, null);
                              return;
                         }
     
                         console.log("Organisasi updated: ", { id: id, ...organisasi });
                         result(null, { id: id, ...organisasi });
                    }
               );
          }
     }

module.exports = Organisasi;