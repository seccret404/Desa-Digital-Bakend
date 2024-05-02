const db = require('../config/database');

class Penduduk {
    constructor(nik, nama, agama, alamat, tanggal_lahir, tempat_lahir, jenis_kelamin, pekerjaan, kewarganegaraan, status_hidup, status_perkawinan, pendidikan_terakhir, no_kk, dusun, id_dusun, createdAt = new Date()) {
        this.nik = nik;
        this.nama = nama;
        this.agama = agama;
        this.alamat = alamat;
        this.tanggal_lahir = tanggal_lahir;
        this.tempat_lahir = tempat_lahir;
        this.jenis_kelamin = jenis_kelamin;
        this.pekerjaan = pekerjaan;
        this.kewarganegaraan = kewarganegaraan;
        this.pendidikan_terakhir = pendidikan_terakhir;
        this.status_hidup = status_hidup;
        this.status_perkawinan = status_perkawinan;
        this.dusun = dusun;
        this.no_kk = no_kk;
        this.createdAt = createdAt;
        this.id_dusun = id_dusun;
    }

    static async findAll() {
        try {
            const query = "SELECT * FROM penduduks";
            const [rows] = await db.promise().query(query);
            return rows;
        } catch (error) {
            throw new Error('Failed to retrieve penduduk: ' + error.message);
        }
    }

    static async create(newPenduduk) {
        try {
            const query = "INSERT INTO penduduks SET ?";
            const [result] = await db.promise().query(query, newPenduduk);
            return { id: result.insertId, ...newPenduduk };
        } catch (error) {
            throw new Error('Failed to create new penduduk: ' + error.message);
        }
    }
    static async findById(id) {
        try {
            const query = "SELECT * FROM penduduks WHERE id = ?";
            const [rows] = await db.promise().query(query, [id]);
            if (rows.length === 0) {
                throw new Error('Penduduk not found');
            }
            return rows[0];
        } catch (error) {
            throw new Error('Failed to retrieve penduduk: ' + error.message);
        }
    }
    static async update(id, updatedData) {
        try {
            const query = "UPDATE penduduks SET ? WHERE id = ?";
            const [result] = await db.promise().query(query, [updatedData, id]);
            
            if (result.affectedRows === 0) {
                throw new Error('Penduduk not found or no changes were made');
            }
            
            return { id: id, ...updatedData };
        } catch (error) {
            throw new Error('Failed to update penduduk: ' + error.message);
        }
    }
    
}

module.exports = Penduduk;
