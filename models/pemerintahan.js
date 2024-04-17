const db = require('../config/database');

class Pemerintah{
     constructor(nama,nik,jabatan,profil, tahun_jabatan,createdAt = new Date()){
          this.nama =nama,
          this.nik = nik,
          this.jabatan = jabatan,
          this.tahun_jabatan = tahun_jabatan,
          this.profil = profil,
          this.createdAt=createdAt
     }

     static findAll(result){
          db.query("SELECT * FROM pemerinah", (err, res)=>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null, res)
          })
     }
     static create(newPemerintah, result) {
          db.query("INSERT INTO pemerinah SET ?", newPemerintah, (err, res) => {
               if (err) {
                    result(err, null);
                    return;
               }
               result(null, { id: res.insertId, ...newPemerintah });
          });
     }
}

module.exports = Pemerintah;