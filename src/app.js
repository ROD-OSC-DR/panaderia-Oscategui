import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "./js/services/productoService.js";

import {
  mostrarLoader,
  mostrarTabla,
  mostrarError,
  mostrarProductos,
  obtenerDatosFormulario,
  cargarFormulario,
  limpiarFormulario,
  mostrarDetalle,
  cerrarModal,
  mostrarToast
} from "./js/ui/productoUI.js";

let productos = [];
let productosFiltrados = [];

const form = document.querySelector("#formProducto");
const btnCancelar = document.querySelector("#btnCancelar");
const buscar = document.querySelector("#buscar");
const btnReintentar = document.querySelector("#btnReintentar");
const tabla = document.querySelector("#tablaProductos");
const btnCerrarModal = document.querySelector("#btnCerrarModal");
const modal = document.querySelector("#modal");

async function cargarProductos() {
  mostrarLoader();
  try {
    productos = await listarProductos();
    productosFiltrados = [...productos];
    mostrarProductos(productosFiltrados);
    mostrarTabla();
  } catch (error) {
    mostrarError(error.message || "No se pudo conectar con la API.");
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const id = document.querySelector("#productoId").value;
  const producto = obtenerDatosFormulario();
  const btnGuardar = document.querySelector("#btnGuardar");

  btnGuardar.disabled = true;
  btnGuardar.textContent = id ? "Actualizando..." : "Guardando...";

  try {
    if (id) {
      await actualizarProducto(id, producto);
      mostrarToast("Producto actualizado correctamente.");
    } else {
      await crearProducto(producto);
      mostrarToast("Producto creado correctamente.");
    }

    limpiarFormulario();
    await cargarProductos();
  } catch (error) {
    console.error(error);
    mostrarToast(error.message || "No se pudo guardar el producto.");
  } finally {
    btnGuardar.disabled = false;
    btnGuardar.textContent = id ? "Actualizar producto" : "Guardar producto";
  }
});

btnCancelar.addEventListener("click", limpiarFormulario);

tabla.addEventListener("click", async event => {
  const button = event.target.closest("button");
  if (!button) return;

  const { id, action } = button.dataset;
  if (action === "view") await verProducto(id);
  if (action === "edit") await editarProducto(id);
  if (action === "delete") await borrarProducto(id);
});

async function verProducto(id) {
  try {
    mostrarDetalle(await obtenerProducto(id));
  } catch (error) {
    mostrarToast(error.message || "No se pudo obtener el producto.");
  }
}

async function editarProducto(id) {
  try {
    cargarFormulario(await obtenerProducto(id));
  } catch (error) {
    mostrarToast(error.message || "No se pudo obtener el producto.");
  }
}

async function borrarProducto(id) {
  const producto = productos.find(item => String(item.id) === String(id));
  const confirmar = confirm(`¿Deseas eliminar "${producto?.nombre || "este producto"}"?`);
  if (!confirmar) return;

  try {
    await eliminarProducto(id);
    mostrarToast("Producto eliminado correctamente.");
    await cargarProductos();
  } catch (error) {
    mostrarToast(error.message || "No se pudo eliminar el producto.");
  }
}

buscar.addEventListener("input", event => {
  const texto = event.target.value.toLowerCase().trim();
  productosFiltrados = productos.filter(producto =>
    [producto.nombre, producto.categoria]
      .some(valor => String(valor).toLowerCase().includes(texto))
  );
  mostrarProductos(productosFiltrados);
});

btnReintentar.addEventListener("click", cargarProductos);
btnCerrarModal.addEventListener("click", cerrarModal);
modal.addEventListener("click", event => {
  if (event.target === modal) cerrarModal();
});

cargarProductos();
