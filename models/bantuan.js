const db = require('../config/database')
class Bantuan{
     constructor(jenis_bantuan,nama_bantuan,createdAt = new Date(), updatedAt = new Date){
          this.jenis_bantuan = jenis_bantuan;
          this.nama_bantuan = nama_bantuan;
          this.createdAt = createdAt,
          this.updatedAt = updatedAt
     }

     static findAll(result){
          db.query("SELECT * FROM bantuans",(err, res)=>{
               if(err){
                    result(err, null);
                    return;
               }
               result(null,res)
          });
     }
     static create(newBantuan, result){
          db.query("INSERT INTO bantuans SET ?", newBantuan,(err, res) =>{
               if(err){
                    result(err,null);
                    return;
               }
               result(null, { id: res.insertId, ...newBantuan });
          })
     }
     static remove(id, result) {
          db.query("DELETE FROM bantuans WHERE id = ?", id, (err, res) => {
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
  
              console.log("bantuan dusun with id: ", id);
              result(null, res);
          });
      }
}

module.exports = Bantuan;
