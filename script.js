'use-strict'

// Datos que llegarían de la API
const DB = {
    "currency": "€",
    "products": [
      {
        "SKU": "0K3QOSOV4V",
        "title": "iFhone 13 Pro",
        "price": "938.99"
      },
      {
        "SKU": "TGD5XORY1L",
        "title": "Cargador",
        "price": "49.99"
      },
      {
        "SKU": "IOKW9BQ9F3",
        "title": "Funda de piel",
        "price": "79.99"
      }
    ]
};


// --------------------------------------------------------

class Carrito {
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


// ----------------------------------------------------------------------------------

function pinta_producto_web(producto,currency){
  
    // A) Creamos el contenedor de la columna
    const colProduct = document.createElement('div');
    colProduct.classList.add('col-product');

    // B) Creamos el contenedor del articulo
    const articulo = document.createElement('div');
    articulo.classList.add('articulo');
    articulo.textContent = `${producto.title}`;

    // C) Creamos contendor para añadir la referencia
    const referencia = document.createElement('div'); 
    referencia.classList.add('referencia');
    referencia.textContent = `Ref: ${producto.SKU}`;

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
    divMenos.textContent = '-'; 
    divMenos.dataset.sku = producto.SKU; 


    const numUnidades = document.createElement('div'); 
    numUnidades.classList.add('num-unidades'); 
    numUnidades.textContent = Number(0); 
    numUnidades.id = `unidades-${producto.SKU}`

    const divMas = document.createElement('button'); 
    divMas.classList.add('sumar'); 
    divMas.textContent = '+'; 
    divMas.dataset.sku = producto.SKU; 

    // Anidamos los elementos
    selCantidad.appendChild(divMenos); 
    selCantidad.appendChild(numUnidades); 
    selCantidad.appendChild(divMas);

    colCantidad.appendChild(selCantidad); 

    nodoProductList.appendChild(colCantidad); 

 

    const colUnidad = document.createElement('div'); 
    colUnidad.classList.add('col-unidad'); 
    colUnidad.textContent = `${producto.price}`

    const colTotal = document.createElement('div'); 
    colTotal.classList.add('col-total'); 
    colTotal.textContent = `${Number(0).toFixed(2)}${currency}`;
    colTotal.dataset.sku = producto.SKU; 

    nodoProductList.appendChild(colUnidad); 
    nodoProductList.appendChild(colTotal); 
}; 

// ----------------------------------------------------------------------------------
// Iniciamos
currency = DB.currency; 
productos = DB.products; 
for(let producto of DB.products){
    pinta_producto_web(producto,currency); 
}

const miCarrito = new Carrito(DB.products);
// ----------------------------------------------------------------------------------


// Logica de botones: 
const nodoBotonesSumaryRestar = document.querySelectorAll('.sumar, .restar');


function escucha_pulsaciones_sumar_o_restar(){
  for (let btn of nodoBotonesSumaryRestar){
    btn.addEventListener('click', sumar_o_restar_numero_unidades); 
  }; 
};

escucha_pulsaciones_sumar_o_restar()


function sumar_o_restar_numero_unidades(event){

  const botonPulsado = event.target; 
  const sku_pulsado = botonPulsado.getAttribute('data-sku'); 
  const esSumar = botonPulsado.classList.contains('sumar'); 

  cantidad = miCarrito.obtenerCantidad(sku_pulsado);
  if(esSumar){
    miCarrito.actualizarUnidades(sku_pulsado, cantidad+1);
  }else{
    cantidad_restada = Math.max(0,cantidad-1); 
    miCarrito.actualizarUnidades(sku_pulsado, cantidad_restada);
  }



  cantidad_actualizada = miCarrito.obtenerCantidad(sku_pulsado);
  const botonUnidades = document.querySelector(`#unidades-${sku_pulsado}`);
  pintar_numeros_actualizados(botonUnidades,cantidad_actualizada,false);


  const nodoProductoTotal = document.querySelector(`.col-total[data-sku="${sku_pulsado}"]`);
  total_actualizado = miCarrito.obtenerTotalPorSku(sku_pulsado); 
  pintar_numeros_actualizados(nodoProductoTotal,total_actualizado,true); 


  
  pintar_total_carrito(sku_pulsado)



}; 

function pintar_numeros_actualizados(nodoNumero,cantidad, mostrarCurrency){
  if (mostrarCurrency){
  nodoNumero.innerHTML = `${cantidad}${currency}`; 
  }else{
      nodoNumero.innerHTML = `${cantidad}`; 
  }
}; 


function pintar_total_carrito(SKU){

  nodoContenedorDerecha = document.querySelector('#cart-summary'); 
  nodoTablaDerecha = document.querySelector('#cart-table');
  console.log(nodoTablaDerecha)
  
  const tituloTotal = document.createElement('h2');
  tituloTotal.textContent = 'Total'; 

  nodoContenedorDerecha.appendChild(tituloTotal); 


  // <div class="article">iFhone13 Pro</div>
  // <div class="precio">2816,97€</div>

  divArticle = document.createElement('div'); 
  divArticle.classList.add('article'); 
  divArticle.innerHTML = miCarrito.obtenerNombreProducto(SKU);
  nodoTablaDerecha.appendChild(divArticle); 


  divPrecio = document.createElement('div'); 
  divPrecio.classList.add('precio'); 
  divPrecio.innerHTML = `${miCarrito.obtenerTotalPorSku(SKU)}${currency}`; 
  nodoTablaDerecha.appendChild(divPrecio); 


    // <div class="total-article">TOTAL</div>
    // <div class="total-precio">5820€</div> -->
  divTOTAL = document.createElement('div'); 
  divTOTAL.classList.add('total-article'); 
  divTOTAL.innerHTML = 'TOTAL';
  nodoTablaDerecha.appendChild(divTOTAL); 

  divTotalPrecio = document.createElement('div'); 
  divTotalPrecio.classList.add('total-precio'); 
  divTotalPrecio.innerHTML = `${miCarrito.obtenerPrecioTotalCarrito()}${currency}`; 
  nodoTablaDerecha.appendChild(divTotalPrecio); 


  nodoContenedorDerecha.appendChild(nodoTablaDerecha); 
}; 



// ----------------------------------------------------------------------------------



