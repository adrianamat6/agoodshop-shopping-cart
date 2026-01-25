'use-strict'

export class Carrito {
    constructor(products) {
      this.products = products; 
      this.cesta = {}; 
    }

    actualizarUnidades(SKU, cantidad) {
      this.cesta[SKU] = cantidad; 
    }
    
    obtenerCantidad(SKU) {
      if (this.cesta[SKU] === undefined){
        return 0;
      } else {
        return this.cesta[SKU]; 
      }
    }

    obtenerInformacionProducto(SKU) {
      return {
        sku: SKU, 
        quantity: this.obtenerCantidad(SKU)
      }; 
    }

    obtenerNombreProducto(SKU){
      const producto = this.products.find((p) => p.SKU === SKU);
      const nombre = producto.title; 
      return nombre; 
    }

    obtenerTotalPorSku(SKU) {
    const producto = this.products.find((p) => p.SKU === SKU);
    const cantidad = this.obtenerCantidad(SKU);

    if (!producto) return "0"; // Si el SKU no existe en el catálogo

    const total = producto.price * cantidad;
    return total.toFixed(2); // Devolvemos solo el número como string con 2 decimales
}

    obtenerPrecioTotalCarrito() {
    const productosEnCesta = this.cesta; 
    const productosCatalogo = this.products; 

    // 1. Filtramos los productos que están en la cesta
    const productosEncontrados = productosCatalogo.filter((cadaProducto) => {
        return cadaProducto.SKU in productosEnCesta;
    });

    // 2. Usamos .map() para crear el array final con la cantidad dentro de cada uno
    const carrito_productos = productosEncontrados.map((cadaProducto) => {
        // Obtenemos la cantidad usando tu método (añadiendo 'this.')
        const unidades = this.obtenerCantidad(cadaProducto.SKU);

        // Retornamos un nuevo objeto que combina lo que ya tenía el producto + la cantidad
        return {
            cadaProducto,    // Esto copia SKU, title y price
            quantity: unidades,  // Esto añade la cantidad
            total: Number((unidades * cadaProducto.price)).toFixed(2),
        };

    });

    let sumaTotal = 0; 

    for(let producto of carrito_productos){
       sumaTotal += Number(producto.total); 
    }
    
    return sumaTotal; 

}
    
    obtenerCarrito() {
    const productosEnCesta = this.cesta; 
    const productosCatalogo = this.products; 

    // 1. Filtramos los productos que están en la cesta
    const productosEncontrados = productosCatalogo.filter((cadaProducto) => {
        return cadaProducto.SKU in productosEnCesta;
    });

    // 2. Usamos .map() para crear el array final con la cantidad dentro de cada uno
    const carrito_productos = productosEncontrados.map((cadaProducto) => {
        // Obtenemos la cantidad usando tu método (añadiendo 'this.')
        const unidades = this.obtenerCantidad(cadaProducto.SKU);

        // Retornamos un nuevo objeto que combina lo que ya tenía el producto + la cantidad
        return {
            cadaProducto,    // Esto copia SKU, title y price
            quantity: unidades,  // Esto añade la cantidad
            total: Number((unidades * cadaProducto.price)).toFixed(2),
        };

    });
    
    const sumaTotal = this.obtenerPrecioTotalCarrito(); 

    return {
        articulos: carrito_productos, 
        granTotal: sumaTotal
    };
}
    
}