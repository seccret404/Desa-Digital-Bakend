const express = require("express");
const cors = require("cors"); // Cors middleware
const db = require("./app/models")

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Menggunakan middleware cors tanpa konfigurasi khusus

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() =>{
     console.log("Database connected");
}).catch((err) =>{
     console.log("Failled to connect", err);
})

require("./app/routes/index")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Desa Digital",
  });
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));
