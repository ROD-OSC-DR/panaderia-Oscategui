export class Producto {
    constructor({
        id = null,
        nombre = "",
        categoria = "",
        precio = 0,
        peso = 0,
        disponible = false,
        imagen = "",
        Nombre,
        Categoria,
        Precio,
        Peso,
        Disponible,
        Imagen
    } = {}) {
        this.id = id;
        this.nombre = Nombre ?? nombre;
        this.categoria = Categoria ?? categoria;
        this.precio = Number(Precio ?? precio);
        this.peso = Number(Peso ?? peso);
        this.disponible = Disponible !== undefined
            ? Disponible === true || Disponible === "true"
            : disponible === true || disponible === "true";
        this.imagen = Imagen ?? imagen;
    }

    toApiPayload() {
        return {
            Nombre: this.nombre,
            Categoria: this.categoria,
            Precio: this.precio,
            Peso: this.peso,
            Disponible: this.disponible,
            Imagen: this.imagen
        };
    }
}
