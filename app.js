const estudiantes = [
  { nombre: "Maria", apellidos: "Mora Perez",   nota: 90 },
  { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
  { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

const formulario = document.getElementById("formEstudiante");
const campoNombre = document.getElementById("nombre");
const campoApellidos = document.getElementById("apellidos");
const campoNota = document.getElementById("nota");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaEstudiantes");


function claseDeNota(nota) {
  if (nota >= 80) return "nota-alta";
  if (nota < 65) return "nota-baja";
  return null;
}

function formatearNota(nota) {
  return Number.isInteger(nota) ? String(nota) : nota.toFixed(2);
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

function renderizarTabla() {
  tabla.innerHTML = "";
  estudiantes.forEach(function (est) {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = est.nombre;

    const celdaApellidos = document.createElement("td");
    celdaApellidos.textContent = est.apellidos;

    const celdaNota = document.createElement("td");
    celdaNota.textContent = formatearNota(est.nota);
    const clase = claseDeNota(est.nota);
    if (clase) celdaNota.classList.add(clase);

    fila.append(celdaNombre, celdaApellidos, celdaNota);
    tabla.appendChild(fila);
  });
}

function actualizarResumen() {
  if (estudiantes.length === 0) return;

  let mayor = estudiantes[0];
  let menor = estudiantes[0];
  let suma = 0;

  estudiantes.forEach(function (est) {
    if (est.nota > mayor.nota) mayor = est;
    if (est.nota < menor.nota) menor = est;
    suma += est.nota;
  });

  const promedio = suma / estudiantes.length;

  document.getElementById("resMayor").textContent =
    mayor.nombre + " " + mayor.apellidos + " (" + formatearNota(mayor.nota) + ")";
  document.getElementById("resPromedio").textContent = promedio.toFixed(2);
  document.getElementById("resMenor").textContent =
    formatearNota(menor.nota) + " (" + menor.nombre + " " + menor.apellidos + ")";
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // evita recargar la página

  const nombre = campoNombre.value.trim();
  const apellidos = campoApellidos.value.trim();
  const textoNota = campoNota.value.trim();

  if (nombre === "" || apellidos === "" || textoNota === "") {
    mostrarMensaje("Todos los campos son obligatorios.", "error");
    return;
  }

  const nota = Number(textoNota);
  if (isNaN(nota) || nota < 0 || nota > 100) {
    mostrarMensaje("La nota debe ser un número entre 0 y 100.", "error");
    return;
  }

  estudiantes.push({ nombre: nombre, apellidos: apellidos, nota: nota });
  renderizarTabla();
  actualizarResumen();
  formulario.reset();
  campoNombre.focus();
  mostrarMensaje("Estudiante agregado correctamente.", "exito");
});

renderizarTabla();
actualizarResumen();
