const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());

// Ruta básica
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// ➕ Nueva ruta
app.get("/alumnos", (req, res) => {
  res.json([
    { id: 1, nombre: "Ana" },
    { id: 2, nombre: "Pedro" },
    { id: 3, nombre: "Luis" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
