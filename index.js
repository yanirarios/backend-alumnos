import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Datos de ejemplo — reemplaza o conecta a tu BD si quieres
let alumnos = [
  { id: 1, nombre: "Ana López", curso: "Matemáticas", progreso: 80 },
  { id: 2, nombre: "Carlos Ruiz", curso: "Lengua", progreso: 60 },
  { id: 3, nombre: "Mariana Torres", curso: "Historia", progreso: 90 }
];

// GET: devolver alumnos
app.get("/api/alumnos", (req, res) => {
  res.json(alumnos);
});

// POST: agregar alumno (ejemplo para el carrito/CRUD)
app.post("/api/alumnos", (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  alumnos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT: actualizar alumno
app.put("/api/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);
  alumnos = alumnos.map(a => a.id === id ? {...a, ...req.body } : a);
  const actualizado = alumnos.find(a => a.id === id);
  if (!actualizado) return res.status(404).json({ error: "No encontrado" });
  res.json(actualizado);
});

// DELETE: eliminar
app.delete("/api/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);
  const antes = alumnos.length;
  alumnos = alumnos.filter(a => a.id !== id);
  if (alumnos.length === antes) return res.status(404).json({ error: "No encontrado" });
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
