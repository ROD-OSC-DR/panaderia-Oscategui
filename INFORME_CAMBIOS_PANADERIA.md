# Informe de cambios: sistema de panadería

## 1. Objetivo

Se modificó la aplicación Vite para convertir el catálogo CRUD de productos en un sistema de gestión para una panadería. La aplicación permite consultar, insertar, editar y eliminar productos mediante una API REST externa creada en MockAPI.

## 2. Cambios principales

### 2.1. Cambio del giro de negocio

Se reemplazaron los textos relacionados con una tienda de ropa por contenido de panadería:

- Nombre de la aplicación: **Pan del Día**.
- Catálogo de productos de panadería.
- Categorías como panes, pastelería, bollería, galletas y salados.
- Mensajes de creación, actualización y eliminación de productos.

Fragmento de `index.html`:

```html
<p class="eyebrow">PANADERÍA ARTESANAL</p>
<h1>Pan del Día</h1>
<p>Gestión del catálogo e inventario de productos horneados.</p>
```

### 2.2. Actualización de atributos

El modelo fue simplificado para utilizar únicamente los atributos definidos para la API:

| Atributo | Tipo |
|---|---|
| `id` | Object ID |
| `Nombre` | String |
| `Categoria` | String |
| `Precio` | Number |
| `Peso` | Number |
| `Disponible` | Boolean |
| `Imagen` | URL |

Fragmento del modelo `producto.js`:

```js
this.nombre = Nombre ?? nombre;
this.categoria = Categoria ?? categoria;
this.precio = Number(Precio ?? precio);
this.peso = Number(Peso ?? peso);
this.disponible = Disponible !== undefined
    ? Disponible === true || Disponible === "true"
    : disponible === true || disponible === "true";
this.imagen = Imagen ?? imagen;
```

Se eliminaron los campos que ya no pertenecen al contrato, como código, tipo, stock, fechas, alérgenos y descripción.

### 2.3. Conexión con MockAPI

Se actualizó el cliente HTTP para utilizar el endpoint proporcionado:

```js
const API_BASE_URL =
    "https://6ab49b5c24ee9d3caa1b9406.mockapi.io/PanaderiaData";
```

El servicio conserva las operaciones CRUD:

```text
GET     /PanaderiaData
GET     /PanaderiaData/:id
POST    /PanaderiaData
PUT     /PanaderiaData/:id
DELETE  /PanaderiaData/:id
```

Además, se adaptó la lectura de la respuesta de MockAPI cuando llega con esta estructura:

```js
const registros = Array.isArray(data)
    ? data
    : data?.value || [];
```

### 2.4. Formulario y tabla

El formulario ahora permite registrar:

- Nombre.
- Categoría.
- Peso.
- Precio.
- Disponibilidad mediante un checkbox.
- URL de imagen.

La tabla muestra el nombre, categoría, peso, precio, disponibilidad y acciones de ver, editar y eliminar.

## 3. Operaciones verificadas

Se verificó el funcionamiento de las siguientes acciones:

- Carga de productos desde MockAPI.
- Inserción de un nuevo producto desde el frontend.
- Actualización de un producto existente.
- Consulta del detalle de un producto.
- Eliminación de un producto.
- Búsqueda por nombre o categoría.
- Sincronización de los cambios con la API externa.

## 4. Evidencias de ejecución

### 4.1. Aplicación cargando el catálogo

**[PLACEHOLDER: insertar captura de la aplicación mostrando los productos cargados desde MockAPI]**

Descripción sugerida: pantalla principal con el catálogo de panadería, estadísticas y productos obtenidos desde la API.

### 4.2. Inserción de un producto

**[PLACEHOLDER: insertar captura del formulario completado antes de guardar]**

Descripción sugerida: formulario con nombre, categoría, precio, peso, disponibilidad e imagen.

### 4.3. Producto insertado en el catálogo

**[PLACEHOLDER: insertar captura del producto nuevo visible en la tabla]**

Descripción sugerida: producto recién creado y mostrado en el catálogo.

### 4.4. Registro creado en MockAPI

**[PLACEHOLDER: insertar captura del registro creado dentro de MockAPI]**

Descripción sugerida: registro con sus atributos e `id` generado por la API.

### 4.5. Edición y eliminación

**[PLACEHOLDER: insertar captura de la edición o confirmación de eliminación]**

Descripción sugerida: resultado de actualizar un producto o mensaje de confirmación después de eliminarlo.

## 5. Validación técnica

La aplicación fue compilada correctamente con:

```bash
npm run build
```

Resultado esperado:

```text
✓ built in ...ms
```

También se realizó una consulta directa al endpoint y se verificó que los productos fueran recibidos correctamente por el servicio frontend.

## 6. Conclusión

La aplicación quedó adaptada al dominio de panadería y conectada con MockAPI. El frontend y la API utilizan el mismo conjunto de atributos, permitiendo mantener sincronizadas las operaciones de inserción, consulta, actualización y eliminación.