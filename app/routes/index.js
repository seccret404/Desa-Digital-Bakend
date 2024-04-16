module.exports = app =>{
     const dusun = require("../controllers/dusun/dusun.controller.js")
     const penduduk = require("../controllers/penduduk/penduduk.controller.js");
     var router = require("express").Router();


     //Penduduk
     router.post("/tambah-penduduk", penduduk.create);

     router.get("/penduduk", penduduk.findAll);
     
     router.get("/penduduk/:id",penduduk.findOne);
     
     router.put("/penduduk/:id",penduduk.update);

     //Dusun
     router.post("/tambah-dusun", dusun.create);
     




     app.use('/api',router);
}