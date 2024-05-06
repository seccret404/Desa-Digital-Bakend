const db = require('../config/database')
class Bantuan{
     constructor(jenis_bantuan,nama_bantuan,bentuk_terima,createdAt = new Date(), updatedAt = new Date){
          this.jenis_bantuan = jenis_bantuan;
          this.nama_bantuan = nama_bantuan;
          this.bentuk_terima = bentuk_terima;
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
}

module.exports = Bantuan;
