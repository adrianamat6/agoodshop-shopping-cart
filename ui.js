'use-strict'

import { gestionarClickBoton } from './events.js'; 

// --- 1. Funcion auxiliar para crear elementos  ---
function crearElemento(tag, clase, contenido = '') {
    const elemento = document.createElement(tag);
    if (clase) elemento.classList.add(clase);
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
}

// --- 2. PINTAR PRODUCTOS (Catálogo) - Columna izquierda ---
export function pintaProductoWeb(producto, currency, miCarrito){
    const nodoProductList = document.querySelector('#product-list');

    // Columna Producto
    const colProduct = crearElemento('div', 'col-product');
    colProduct.appendChild(crearElemento('div', 'articulo', producto.title));
    colProduct.appendChild(crearElemento('div', 'referencia', `Ref: ${producto.SKU}`));

    // Columna Cantidad
    const colCantidad = crearElemento('div', 'col-cantidad');
    const selCantidad = crearElemento('div', 'selector-cantidad');

    const divMenos = crearElemento('button', 'restar', '-');
    divMenos.dataset.sku = producto.SKU; 
    // Creamos el evento aquí
    divMenos.addEventListener('click', function(event){
        gestionarClickBoton(event,miCarrito,currency); 
    }); 

    const numUnidades = crearElemento('div', 'num-unidades', '0');
    numUnidades.id = `unidades-${producto.SKU}`;

    const divMas = crearElemento('button', 'sumar', '+');
    // Creamos el evento aquí
    divMas.dataset.sku = producto.SKU;
    divMas.addEventListener('click', function(event){
        gestionarClickBoton(event,miCarrito,currency); 
    }); 

    selCantidad.appendChild(divMenos);
    selCantidad.appendChild(numUnidades);
    selCantidad.appendChild(divMas); 
    colCantidad.appendChild(selCantidad);

    // Columna Precio
    const colUnidad = crearElemento('div', 'col-unidad', `${producto.price}`);

    // Columna Total
    const colTotal = crearElemento('div', 'col-total', `0.00${currency}`);
    colTotal.dataset.sku = producto.SKU;

    nodoProductList.appendChild(colProduct);
    nodoProductList.appendChild(colCantidad);
    nodoProductList.appendChild(colUnidad);
    nodoProductList.appendChild(colTotal);
};


// --- 3. ACTUALIZAR NÚMEROS ---
export function pintarNumerosActualizados(nodoNumero, cantidad, mostrarCurrency, currency){
    if (mostrarCurrency){
        nodoNumero.innerHTML = `${cantidad}${currency}`; 
    } else {
        nodoNumero.innerHTML = `${cantidad}`; 
    }
}; 


// --- 4. PINTAR CARRITO ---
export function pintarTotalCarrito(infoCarrito, currency) {
    // Esta función solo decide a quién llamar
    if (infoCarrito.articulos.length === 0) {
        pintarCarritoVacio();
    } else {
        pintarCarritoConProductos(infoCarrito, currency);
    }
}

// Sub-Función A: Cuando no hay productos
function pintarCarritoVacio() {
    const nodoContenedorDerecha = document.querySelector('#cart-summary');
    
    // 1. Limpiamos todo (borramos título y tabla vieja)
    nodoContenedorDerecha.innerHTML = ''; 

    // 2. Ponemos el mensaje
    const mensaje = crearElemento('div', 'empty-msg', 'Tu carrito está vacío');
    nodoContenedorDerecha.appendChild(mensaje);
}

// Sub-función B: Cuando SÍ hay productos
function pintarCarritoConProductos(infoCarrito, currency) {
    const nodoContenedorDerecha = document.querySelector('#cart-summary');
    
    // 1. Limpiamos el contenedor padre para ordenar los elementos
    nodoContenedorDerecha.innerHTML = ''; 

    // 2. Añadimos primero el TÍTULO
    const tituloTotal = document.createElement('h2');
    tituloTotal.innerHTML = 'Total';
    nodoContenedorDerecha.appendChild(tituloTotal);

    // 3. Creamos la TABLA
    const nodoTablaDerecha = document.createElement('div');
    nodoTablaDerecha.id = 'cart-table'; // Importante para el CSS
    
    // Recorremos y pintamos filas
    for(let cadaArticulo of infoCarrito.articulos){
        const datosProducto = cadaArticulo.cadaProducto; 
        
        const divArticle = crearElemento('div', 'article', datosProducto.title);
        const divPrecio = crearElemento('div', 'precio', `${cadaArticulo.total}${currency}`);
        
        nodoTablaDerecha.appendChild(divArticle);  
        nodoTablaDerecha.appendChild(divPrecio); 
    }

    // 4. Añadimos el TOTAL a la tabla
    const divTOTAL = crearElemento('div', 'total-article', 'TOTAL');
    const divTotalPrecio = crearElemento('div', 'total-precio', `${(infoCarrito.granTotal).toFixed(2)}${currency}`);

    nodoTablaDerecha.appendChild(divTOTAL); 
    nodoTablaDerecha.appendChild(divTotalPrecio); 

    // 5. Metemos la tabla en el contenedor (debajo del título)
    nodoContenedorDerecha.appendChild(nodoTablaDerecha);
}