const db = require('../config/database');

class Pemerintah{
     constructor(nama,nik,jabatan,profil,tahun_mulai = new Date(),tahun_selesai= new Date(),createdAt = new Date(),updatedAt = new Date()){
          this.nama =nama;
          this.nik = nik;
          this.jabatan = jabatan;
          this.profil = profil;
          this.tahun_mulai = tahun_mulai;
          this.tahun_selesai = tahun_selesai;
          this.createdAt=createdAt;
          this.updatedAt = updatedAt
     }
     static findAll(result){
          db.query("SELECT * FROM pemerintahans", (err, res)=>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null, res)
          })
     }
     static create(newPemerintah, result) {
          db.query("INSERT INTO pemerintahans SET ?", newPemerintah, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newPemerintah });
          });
     }

     static findById(id, result) {
          db.query(`SELECT * FROM pemerintahans WHERE id = ${id}`, (err, res) => {
              if (err) {
                  result(err, null);
                  return;
              }
  
              if (res.length) {
                  result(null, res[0]);
                  return;
              }
  
              result({ message: "Pemerintah not found" }, null);
          });
      }

      static update(id, pemerintah, result) {
          db.query(
              "UPDATE pemerintahans SET nama = ?, nik = ?, jabatan = ?, profil = ?, tahun_mulai = ?, tahun_selesai = ? WHERE id = ?",
              [pemerintah.nama, pemerintah.nik, pemerintah.jabatan,pemerintah.profil, pemerintah.tahun_mulai, pemerintah.tahun_selesai, id],
              (err, res) => {
                  if (err) {
                      result(err, null);
                      return;
                  }
  
                  if (res.affectedRows == 0) {
                      // pemerintah tidak ditemukan dengan id yang diberikan
                      result({ kind: "not_found" }, null);
                      return;
                  }
  
                  console.log("pemerintah updated: ", { id: id, ...pemerintah });
                  result(null, { id: id, ...pemerintah });
              }
          );
      }
      
      
}

module.exports = Pemerintah;