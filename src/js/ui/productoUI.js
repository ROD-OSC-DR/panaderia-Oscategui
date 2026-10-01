const tabla = document.querySelector("#tablaProductos");
const loader = document.querySelector("#loader");
const tablaContainer = document.querySelector("#tablaContainer");
const errorContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#errorMessage");
const totalProductos = document.querySelector("#totalProductos");
const productosDisponibles = document.querySelector("#productosDisponibles");
const precioPromedio = document.querySelector("#precioPromedio");
const formTitle = document.querySelector("#formTitle");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");
const form = document.querySelector("#formProducto");

const campos = [
    "nombre", "categoria", "peso", "precio", "imagen"
];

function escaparHtml(valor = "") {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function fechaLegible(fecha) {
    if (!fecha) return "No registrada";
    const valor = new Date(`${fecha}T00:00:00`);
    return Number.isNaN(valor.getTime())
        ? escaparHtml(fecha)
        : new Intl.DateTimeFormat("es-PE", { dateStyle: "long" }).format(valor);
}

export function mostrarLoader() {
    loader.classList.remove("hidden");
    tablaContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");
}

export function ocultarLoader() {
    loader.classList.add("hidden");
}

export function mostrarError(mensaje) {
    ocultarLoader();
    tablaContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");
    errorMessage.textContent = mensaje;
}

export function mostrarTabla() {
    ocultarLoader();
    errorContainer.classList.add("hidden");
    tablaContainer.classList.remove("hidden");
}

export function mostrarProductos(productos) {
    tabla.innerHTML = "";

    if (!productos?.length) {
        tabla.innerHTML = '<tr><td colspan="7" class="empty-state">Aún no hay productos registrados.</td></tr>';
        actualizarEstadisticas([]);
        return;
    }

    productos.forEach(producto => {
        const fila = document.createElement("tr");
        const disponibilidadClass = producto.disponible ? "stock-good" : "stock-low";
        const disponibilidadTexto = producto.disponible ? "Disponible" : "No disponible";
        const imagen = escaparHtml(producto.imagen);

        fila.innerHTML = `
            <td>${escaparHtml(producto.id)}</td>
            <td><div class="product-cell">
                <img class="product-image" src="${imagen}" alt="${escaparHtml(producto.nombre)}" onerror="this.classList.add('image-fallback'); this.removeAttribute('src'); this.alt='Imagen no disponible';">
                <div><div class="product-name">${escaparHtml(producto.nombre)}</div><div class="product-code">ID: ${escaparHtml(producto.id)}</div></div>
            </div></td>
            <td>${escaparHtml(producto.categoria)}</td>
            <td>${producto.peso} g</td>
            <td>S/ ${producto.precio.toFixed(2)}</td>
            <td><span class="${disponibilidadClass}">${disponibilidadTexto}</span></td>
            <td class="actions">
                <button class="btn btn-view" data-action="view" data-id="${escaparHtml(producto.id)}">Ver</button>
                <button class="btn btn-edit" data-action="edit" data-id="${escaparHtml(producto.id)}">Editar</button>
                <button class="btn btn-delete" data-action="delete" data-id="${escaparHtml(producto.id)}">Eliminar</button>
            </td>`;
        tabla.appendChild(fila);
    });

    actualizarEstadisticas(productos);
}

function actualizarEstadisticas(productos) {
    totalProductos.textContent = productos.length;
    productosDisponibles.textContent = productos.filter(producto => producto.disponible).length;
    const promedio = productos.length
        ? productos.reduce((total, producto) => total + producto.precio, 0) / productos.length
        : 0;
    precioPromedio.textContent = `S/ ${promedio.toFixed(2)}`;
}

export function obtenerDatosFormulario() {
    const texto = id => document.querySelector(`#${id}`).value.trim();
    return {
        nombre: texto("nombre"),
        categoria: texto("categoria"),
        peso: Number(texto("peso")),
        precio: Number(texto("precio")),
        disponible: document.querySelector("#disponible").checked,
        imagen: texto("imagen")
    };
}

export function cargarFormulario(producto) {
    document.querySelector("#productoId").value = producto.id;
    campos.forEach(campo => {
        document.querySelector(`#${campo}`).value = producto[campo] ?? "";
    });
    document.querySelector("#disponible").checked = producto.disponible;
    formTitle.textContent = "Editar producto de panadería";
    btnGuardar.textContent = "Actualizar producto";
    btnCancelar.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function limpiarFormulario() {
    form.reset();
    document.querySelector("#productoId").value = "";
    formTitle.textContent = "Nuevo producto de panadería";
    btnGuardar.textContent = "Guardar producto";
    btnCancelar.classList.add("hidden");
}

export function mostrarDetalle(producto) {
    const detalle = (etiqueta, valor) => `<div class="detail-item"><span class="detail-label">${etiqueta}</span><span class="detail-value">${valor}</span></div>`;
    document.querySelector("#modalBody").innerHTML = `
        <h2 id="detalleTitulo">${escaparHtml(producto.nombre)}</h2>
        <div class="detail-grid">
            ${detalle("Categoría", escaparHtml(producto.categoria))}
            ${detalle("Peso aproximado", `${producto.peso} g`)}
            ${detalle("Precio", `S/ ${producto.precio.toFixed(2)}`)}
            ${detalle("Disponibilidad", producto.disponible ? "Disponible" : "No disponible")}
            ${detalle("Imagen", escaparHtml(producto.imagen))}
        </div>`;
    document.querySelector("#modal").classList.remove("hidden");
}

export function cerrarModal() {
    document.querySelector("#modal").classList.add("hidden");
}

export function mostrarToast(mensaje) {
    const toast = document.querySelector("#toast");
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}
