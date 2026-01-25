'use-strict'

export function pinta_producto_web(producto,currency){
  
    // A) Creamos el contenedor de la columna
    const colProduct = document.createElement('div');
    colProduct.classList.add('col-product');

    // B) Creamos el contenedor del articulo
    const articulo = document.createElement('div');
    articulo.classList.add('articulo');
    articulo.innerHTML = `${producto.title}`;

    // C) Creamos contendor para añadir la referencia
    const referencia = document.createElement('div'); 
    referencia.classList.add('referencia');
    referencia.innerHTML = `Ref: ${producto.SKU}`;

    // D) Anidamos el contenedor dentro del contenedor padre 'col-product'
    colProduct.appendChild(articulo);
    colProduct.appendChild(referencia); 

    // E) Anidamos los contenedores dentro del contenedor padre 'product-list'
    const nodoProductList = document.querySelector('#product-list');
    nodoProductList.appendChild(colProduct); 


    // Creamos los elementos sueltos
    const colCantidad = document.createElement('div'); 
    colCantidad.classList.add('col-cantidad'); 

    const selCantidad = document.createElement('div'); 
    selCantidad.classList.add('selector-cantidad'); 

    const divMenos = document.createElement('button'); 
    divMenos.classList.add('restar'); 
    divMenos.innerHTML = '-'; 
    divMenos.dataset.sku = producto.SKU; 


    const numUnidades = document.createElement('div'); 
    numUnidades.classList.add('num-unidades'); 
    numUnidades.innerHTML = Number(0); 
    numUnidades.id = `unidades-${producto.SKU}`

    const divMas = document.createElement('button'); 
    divMas.classList.add('sumar'); 
    divMas.innerHTML = '+'; 
    divMas.dataset.sku = producto.SKU; 

    // Anidamos los elementos
    selCantidad.appendChild(divMenos); 
    selCantidad.appendChild(numUnidades); 
    selCantidad.appendChild(divMas);

    colCantidad.appendChild(selCantidad); 

    nodoProductList.appendChild(colCantidad); 

 

    const colUnidad = document.createElement('div'); 
    colUnidad.classList.add('col-unidad'); 
    colUnidad.innerHTML = `${producto.price}`

    const colTotal = document.createElement('div'); 
    colTotal.classList.add('col-total'); 
    colTotal.innerHTML = `${Number(0).toFixed(2)}${currency}`;
    colTotal.dataset.sku = producto.SKU; 

    nodoProductList.appendChild(colUnidad); 
    nodoProductList.appendChild(colTotal); 
}; 


export function pintar_numeros_actualizados(nodoNumero,cantidad, mostrarCurrency,currency){
  if (mostrarCurrency){
  nodoNumero.innerHTML = `${cantidad}${currency}`; 
  }else{
      nodoNumero.innerHTML = `${cantidad}`; 
  }
}; 


export function pintar_total_carrito(infoCarrito,currency) {

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
