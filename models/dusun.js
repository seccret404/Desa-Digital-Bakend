const db = require('../config/database');

class Dusun {
     constructor(nama_ketua, nama_dusun, createdAt = new Date(), updatedAt = new Date()) {
          this.nama_ketua = nama_ketua;
          this.nama_dusun = nama_dusun;
          this.createdAt = createdAt;
          this.updatedAt = updatedAt;

      }

    static findAll(result) {
        db.query("SELECT * FROM dusuns", (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }

    static create(newDusun, result) {
        db.query("INSERT INTO dusuns SET ?", newDusun, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newDusun });
        });
    }
}

module.exports = Dusun;
