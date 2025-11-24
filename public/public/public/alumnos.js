const API = "http://localhost:3001/alumnos";
const tbody = document.getElementById("alumnos-body");
const btnAgregar = document.getElementById("btnAgregar");

async function cargarAlumnos() {
  const res = await fetch(API);
  const data = await res.json();

  tbody.innerHTML = "";

  data.forEach(alumno => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><span class="student-tag">${alumno.nombre}</span></td>
      <td>${alumno.email || ""}</td>
      <td>
        <button onclick="eliminarAlumno(${alumno.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function agregarAlumno() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    alert("Completa todos los campos");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre, email })
  });

  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";

  cargarAlumnos();
}

async function eliminarAlumno(id) {
  if (!confirm("¿Eliminar alumno?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  cargarAlumnos();
}

btnAgregar.addEventListener("click", agregarAlumno);
cargarAlumnos();
