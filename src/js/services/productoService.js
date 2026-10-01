import {
    get,
    post,
    put,
    remove
} from "../api/httpClient.js";

import {
    Producto
} from "../models/producto.js";


const ENDPOINT = "";

export async function listarProductos() {

    const data =
        await get(ENDPOINT);

    const registros = Array.isArray(data)
        ? data
        : data?.value || [];

    return registros.map(
        producto => new Producto(producto)
    );
}

export async function
    obtenerProducto(id) {

    const data =
        await get(
            `/${id}`
        );


    return new Producto(data);
}

export async function
    crearProducto(producto) {

    const data =
        await post(
            ENDPOINT,
            new Producto(producto).toApiPayload()
        );


    return new Producto(data);
}

export async function
    actualizarProducto(
        id,
        producto
    ) {

    const data =
        await put(
            `/${id}`,
            new Producto(producto).toApiPayload()
        );


    return new Producto(data);
}

export async function
    eliminarProducto(id) {

    return await remove(
        `/${id}`
    );
}
