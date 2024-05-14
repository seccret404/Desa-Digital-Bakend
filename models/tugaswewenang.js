const db = require('../config/database')

class Tugas{
     constructor(jabatan,tugas,wewenang,fungsi, createdAt = new Date()){
          this.jabatan = jabatan;
          this.tugas = tugas;
          this.wewenang = wewenang;
          this.fungsi = fungsi;
          this.createdAt = createdAt;
     }


     static findAll(result){
          db.query("SELECT * FROM tugaswewenang", (err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null,res);
          })
     }
     
     static create(newTugas , result){
          db.query("INSERT INTO tugaswewenang SET ?", newTugas, (err, res)=>{
               if(err){
                    result(err, null);
                    return;
               }
               result(null, {id: res.insertId, ...newTugas});
          });
     }

     static findById(id, result) {
          db.query(`SELECT * FROM tugaswewenang WHERE id = ${id}`, (err, res) => {
               if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
               }

               if (res.length) {
                    console.log("found tugas: ", res[0]);
                    result(null, res[0]);
                    return;
               }

               result({ kind: "not_found" }, null);
          });
     }

     static updateById(id, tugas, result) {
          db.query(
               "UPDATE tugaswewenang SET jabatan = ?, tugas = ?,wewenang = ?, fungsi = ? WHERE id = ?",
               [tugas.jabatan, tugas.tugas,tugas.wewenang,tugas.fungsi, id],
               (err, res) => {
                    if (err) {
                         console.log("error: ", err);
                         result(null, err);
                         return;
                    }

                    if (res.affectedRows == 0) {
                         // Tidak ada dusun dengan ID tersebut ditemukan
                         result({ kind: "not_found" }, null);
                         return;
                    }

                    console.log("updated tugas: ", { id: id, ...tugas });
                    result(null, { id: id, ...tugas });
               }
          );
     }
}

module.exports = Tugas;