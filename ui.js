'use-strict'


function crearElemento(tag, clase, contenido = '') {
    const elemento = document.createElement(tag);
    if (clase){
      elemento.classList.add(clase);
    }; 

    if(contenido){
      elemento.innerHTML = contenido;
    }; 

    return elemento;
}


export function pintaProductoWeb(producto, currency){
    const nodoProductList = document.querySelector('#product-list');

    // 1. Columna Producto
    const colProduct = crearElemento('div', 'col-product');
    const articulo = crearElemento('div', 'articulo', producto.title);
    const referencia = crearElemento('div', 'referencia', `Ref: ${producto.SKU}`);
    
    colProduct.appendChild(articulo);
    colProduct.appendChild(referencia);

    // 2. Columna Cantidad
    const colCantidad = crearElemento('div', 'col-cantidad');
    const selCantidad = crearElemento('div', 'selector-cantidad');

    // Botón MENOS
    const divMenos = crearElemento('button', 'restar', '-');
    divMenos.dataset.sku = producto.SKU;

    // Número central
    const numUnidades = crearElemento('div', 'num-unidades', '0');
    numUnidades.id = `unidades-${producto.SKU}`;

    // Botón MÁS 
    const divMas = crearElemento('button', 'sumar', '+');
    divMas.dataset.sku = producto.SKU;

    // Añadimos al contenedor
    selCantidad.appendChild(divMenos);
    selCantidad.appendChild(numUnidades);
    selCantidad.appendChild(divMas); 
    colCantidad.appendChild(selCantidad);

    // 3. Columna Precio
    const colUnidad = crearElemento('div', 'col-unidad', `${producto.price}`);

    // 4. Columna Total
    const colTotal = crearElemento('div', 'col-total', `0.00${currency}`);
    colTotal.dataset.sku = producto.SKU;

    // Añadimos las columnas al contenedor principal
    nodoProductList.appendChild(colProduct);
    nodoProductList.appendChild(colCantidad);
    nodoProductList.appendChild(colUnidad);
    nodoProductList.appendChild(colTotal);
};


export function pintarNumerosActualizados(nodoNumero,cantidad, mostrarCurrency,currency){
  if (mostrarCurrency){
  nodoNumero.innerHTML = `${cantidad}${currency}`; 
  }else{
      nodoNumero.innerHTML = `${cantidad}`; 
  }
}; 


export function pintarTotalCarrito(infoCarrito,currency) {

  const nodoContenedorDerecha = document.querySelector('#cart-summary'); 
  const nodoTablaDerecha = document.querySelector('#cart-table');
  
  nodoTablaDerecha.innerHTML = '';

  if(!nodoContenedorDerecha.querySelector('h2')){
    const tituloTotal = document.createElement('h2');
    tituloTotal.innerHTML = 'Total';  
    nodoContenedorDerecha.appendChild(tituloTotal); 
  }  


  //const infoCarrito = miCarrito.obtenerCarrito();
  const articulos = infoCarrito.articulos; 

  for(let cadaArticulo of articulos){
    const datosProducto = cadaArticulo.cadaProducto; 
    
    const title = datosProducto.title; 
    const precioFila = cadaArticulo.total; 

    const divArticle = document.createElement('div'); 
    divArticle.classList.add('article'); 
    divArticle.innerHTML = title; 
    nodoTablaDerecha.appendChild(divArticle);  

    const divPrecio = document.createElement('div'); 
    divPrecio.classList.add('precio'); 
    divPrecio.innerHTML = `${precioFila}${currency}`; 
    nodoTablaDerecha.appendChild(divPrecio); 
  }

  // 5. Pintar el GRAN TOTAL (Importante: faltaba esto)
  const divTOTAL = document.createElement('div'); 
  divTOTAL.classList.add('total-article'); 
  divTOTAL.innerHTML = 'TOTAL';
  nodoTablaDerecha.appendChild(divTOTAL); 

  const divTotalPrecio = document.createElement('div'); 
  divTotalPrecio.classList.add('total-precio'); 
  divTotalPrecio.innerHTML = `${(infoCarrito.granTotal).toFixed(2)}${currency}`; // granTotal viene del objeto infoCarrito
  nodoTablaDerecha.appendChild(divTotalPrecio); 


  nodoContenedorDerecha.appendChild(nodoTablaDerecha)
}
