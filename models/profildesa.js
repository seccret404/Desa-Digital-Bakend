const db = require('../config/database');

class Profil {
    constructor(nama_desa, alamat_kantor, kecamatan, kabupaten, provinsi, profil_singkat, gambar_desa, batas_barat, batas_timur, batas_utara, batas_selatan, visi_desa, misi_desa, sejarah_desa, createdAt = new Date(), updatedAt = new Date()) {
        this.nama_desa = nama_desa;
        this.alamat_kantor = alamat_kantor;
        this.kecamatan = kecamatan;
        this.kabupaten = kabupaten;
        this.provinsi = provinsi;
        this.profil_singkat = profil_singkat;
        this.gambar_desa = gambar_desa;
        this.batas_barat = batas_barat;
        this.batas_timur = batas_timur;
        this.batas_utara = batas_utara;
        this.batas_selatan = batas_selatan;
        this.visi_desa = visi_desa;
        this.misi_desa = misi_desa;
        this.sejarah_desa = sejarah_desa;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static findAll(result) {
        db.query("SELECT * FROM profiles", (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }

    static create(newProfile, result) {
        console.log("Data yang dikirimkan: ", newProfile);
        db.query("INSERT INTO profiles SET ?", newProfile, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newProfile });
        });
    }

    static findById(id, result) {
        db.query("SELECT * FROM profiles WHERE id = ?", [id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
    }
    

    static update(id, profil, result) {
        db.query(
            "UPDATE profiles SET nama_desa = ?, alamat_kantor = ?, kecamatan = ?, kabupaten = ?, provinsi = ?, profil_singkat = ?, gambar_desa = ?, batas_barat = ?, batas_timur = ?, batas_utara = ?, batas_selatan = ?, visi_desa = ?, misi_desa = ?, sejarah_desa = ?, updatedAt = ? WHERE id = ?",
            [profil.nama_desa, profil.alamat_kantor, profil.kecamatan, profil.kabupaten, profil.provinsi, profil.profil_singkat, profil.gambar_desa, profil.batas_barat, profil.batas_timur, profil.batas_utara, profil.batas_selatan, profil.visi_desa, profil.misi_desa, profil.sejarah_desa, new Date(), id],
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, { id: id, ...profil });
            }
        );
    }
}

module.exports = Profil;
