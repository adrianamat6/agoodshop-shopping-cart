'use-strict'

export class Carrito {
    constructor(products) {
        this.products = products; // catalogo total
        this.cesta = {};          // cesta de productos
    };

    actualizarUnidades(SKU, cantidad) {
        cantidad = Math.max(0, cantidad);
        this.cesta[SKU] = cantidad;
    };

    obtenerCantidad(SKU) {
        if (this.cesta[SKU] === undefined) {
            return 0;
        } else {
            return this.cesta[SKU];
        };
    };

    obtenerInformacionProducto(SKU) {
        return {
            sku: SKU,
            quantity: this.obtenerCantidad(SKU)
        };
    };

    obtenerNombreProducto(SKU) {
        const producto = this.products.find((p) => p.SKU === SKU);
        const nombre = producto.title;
        return nombre;
    };

    obtenerTotalPorSku(SKU) {
        const producto = this.products.find((p) => p.SKU === SKU);
        const cantidad = this.obtenerCantidad(SKU);

        if (!producto) {
            return "0.00";
        } else {
            const total = producto.price * cantidad;
            return total.toFixed(2)
        };
    };

    obtenerCarrito() {
        const productosEnCesta = this.cesta;
        const productosCatalogo = this.products;

        // 1. Filtramos
        const productosEncontrados = this.products.filter((producto) => {
                const cantidad = this.obtenerCantidad(producto.SKU);
                return cantidad > 0;
            });

        // 2. Mapeamos los productos del carrito para obtener la cantidad y el precio total a pagar
        const carrito_productos = productosEncontrados.map((cadaProducto) => {
            const unidades = this.obtenerCantidad(cadaProducto.SKU);
            return {
                cadaProducto,
                quantity: unidades,
                total: Number((unidades * cadaProducto.price)).toFixed(2),
            };
        });

        // 3. Calculamos el total a pagar
        let sumaTotalCalculada = 0;
        for (const item of carrito_productos) {
            sumaTotalCalculada += Number(item.total);
        }

        // 4. Devolvemos todo junto
        return {
            articulos: carrito_productos,
            granTotal: sumaTotalCalculada
        };
    }; 

    obtenerPrecioTotalCarrito() {
        const datosCarrito = this.obtenerCarrito();
        return datosCarrito.granTotal;
    };

};