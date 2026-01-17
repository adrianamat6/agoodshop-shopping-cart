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

        // 3. Calculamos el precio total a pagar 
        let sumaTotal = 0; 
        for(let producto of carrito_productos){
          sumaTotal += Number(producto.total); 
        }
    

        // 4. Extraemos la lista de productos con su info y el precio total a pagar
    return {
        articulos: carrito_productos, 
        granTotal: sumaTotal
    };
    }

        
}


const miCarrito = new Carrito(DB.products);
miCarrito.actualizarUnidades("0K3QOSOV4V", 4);
miCarrito.actualizarUnidades("TGD5XORY1L", 8);

carrito = miCarrito.obtenerCarrito()
console.log(carrito)



// Lectura de nodos del HTML padres: 
nodoDetailProducts = document.querySelector('#detail-products'); 
nodoProductList = document.querySelector('#product-list');  



function pinta_producto_web(SKU,title,price,currency){

    // 1) Replicamos la primera parte: 
    /*
        <div class="col-product"> 
            <div class="articulo">iFhone 13 Pro</div>
            <div class="referencia">Ref: 0K3QOSOV4V</div> 
        </div>

    */
    // A) Creamos el contenedor de la columna
    const colProduct = document.createElement('div');
    colProduct.classList.add('col-product');

    // B) Creamos el contenedor del articulo
    const articulo = document.createElement('div');
    articulo.classList.add('articulo');
    articulo.textContent = `${title}`;

    // C) Creamos contendor para añadir la referencia
    const referencia = document.createElement('div'); 
    referencia.classList.add('referencia');
    referencia.textContent = `Ref: ${SKU}`;

    // D) Anidamos el contenedor dentro del contenedor padre 'col-product'
    colProduct.appendChild(articulo);
    colProduct.appendChild(referencia); 

    // E) Anidamos los contenedores dentro del contenedor padre 'product-list'
    nodoProductList.appendChild(colProduct); 

    // Visualiza resultados
    //console.log(nodoProductList.outerHTML);


    // 2) Replicamos la segunda parte: 
    /*
        <div class="col-cantidad">
            <div class = "selector-cantidad">
                <div>-</div>
                <div class="num-unidades">3</div>
                <div>+</div>
            </div>
        </div>

    */

    // Creamos los elementos sueltos
    const colCantidad = document.createElement('div'); 
    colCantidad.classList.add('col-cantidad'); 

    const selCantidad = document.createElement('div'); 
    selCantidad.classList.add('selector-cantidad'); 

    const divMenos = document.createElement('button'); 
    divMenos.classList.add('restar'); 
    divMenos.textContent = '-'; 
    divMenos.dataset.sku = SKU; 


    const numUnidades = document.createElement('div'); 
    numUnidades.classList.add('num-unidades'); 
    numUnidades.textContent = `1`; 

    const divMas = document.createElement('button'); 
    divMas.classList.add('sumar'); 
    divMas.textContent = '+'; 

    // Anidamos los elementos
    selCantidad.appendChild(divMenos); 
    selCantidad.appendChild(numUnidades); 
    selCantidad.appendChild(divMas);

    colCantidad.appendChild(selCantidad); 

    nodoProductList.appendChild(colCantidad); 

    // 3) Replicamos la tercera parte: 
    /*
        <div class="col-unidad">938,99€</div>
        <div class="col-total">2816,97€</div>
    */

    const colUnidad = document.createElement('div'); 
    colUnidad.classList.add('col-unidad'); 
    colUnidad.textContent = `${price}`

    const colTotal = document.createElement('div'); 
    colTotal.classList.add('col-total'); 
    colTotal.textContent = `${price}${currency}`

    nodoProductList.appendChild(colUnidad); 
    nodoProductList.appendChild(colTotal); 
}; 



console.log('------------------')


currency = DB.currency; 

for(let {SKU, title, price} of DB.products){
   // console.log(`El SKU es: ${SKU}`);
   //console.log(`El title es: ${title}`);
   //console.log(`El price es: ${price}`);

    pinta_producto_web(SKU,title,price,currency); 

}


//  ---------------------------------------------------
/*
nodoNumeroUnidades = document.querySelectorAll('.num-unidades'); 

function check_number(){
  let listaUnidades = [];

  for (let nodo of nodoNumeroUnidades) {
    let numeroUnidades = Number(nodo.textContent);
    listaUnidades.push(numeroUnidades);
  }

  return listaUnidades
}; 
*/

//  ---------------------------------------------------
console.log('---------------------------')
console.log('Modificar Unidades')
const nodoBotonesRestar = document.querySelectorAll('.restar'); 
const nodoBotonesSumar = document.querySelectorAll('.sumar'); 
const nodoNumeroUnidades = document.querySelectorAll('.num-unidades'); 

function escucha_pulsaciones_restar(){
  for (let nodoBotonResta of nodoBotonesRestar){
    nodoBotonResta.addEventListener('click', restar_numero_unidades); 
  }; 
};


function restar_numero_unidades(event){
  const botonPulsado = event.target; 
  const sku = botonPulsado.dataset.sku;

  const nodoCantidad = document.getElementById(`cant-${sku}`);
  console.log('sku es:',sku)
  console.log('nodo cantidad',nodoCantidad)

  console.log('Se ha pulsado un botón'); 
  //numeroUnidades = Number(nodo.textContent) - 1;
  //console.log(numeroUnidades); 
}; 

escucha_pulsaciones_restar();




