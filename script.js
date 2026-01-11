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


console.log(DB.currency); 
console.log('------------------')

for(let {SKU, title, price} of DB.products){
    console.log(`El SKU es: ${SKU}`);
    console.log(`El title es: ${title}`);
    console.log(`El price es: ${price}`);

}

// Tenemos que recrear esto: 
/*
<!-- SECCIÓN de datos a pintar -->
            <div class="col-product"> 
                <div class="articulo">iFhone 13 Pro</div>
                <div class="referencia">Ref: 0K3QOSOV4V</div> 
            </div>
            <div class="col-cantidad">
                <div class = "selector-cantidad">
                    <div>-</div>
                    <div class="num-unidades">3</div>
                    <div>+</div>
                </div>
            </div>
            <div class="col-unidad">938,99€</div>
            <div class="col-total">2816,97€</div>
*/


// Dividimos por partes: 


// Lectura de nodos del HTML padres: 
nodoDetailProducts = document.querySelector('#detail-products'); 
nodoProductList = document.querySelector('#product-list');  


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
articulo.textContent = `iFhone 13 Pro`;

// C) Creamos contendor para añadir la referencia
const referencia = document.createElement('div'); 
referencia.classList.add('referencia');
referencia.textContent = `Ref: 0K3QOSOV4V`;

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

const divMenos = document.createElement('div'); 
divMenos.textContent = '-'; 

const numUnidades = document.createElement('div'); 
numUnidades.classList.add('num-unidades'); 
numUnidades.textContent = `3`; 

const divMas = document.createElement('div'); 
divMas.textContent = '+'; 

// Anidamos los elementos
selCantidad.appendChild(divMenos); 
selCantidad.appendChild(numUnidades); 
selCantidad.appendChild(divMas);

colCantidad.appendChild(selCantidad); 

nodoProductList.appendChild(colCantidad); 

console.log('----------------------------------')
console.log(nodoProductList.outerHTML);



// 3) Replicamos la tercera parte: 
/*
    <div class="col-unidad">938,99€</div>
    <div class="col-total">2816,97€</div>
*/

const colUnidad = document.createElement('div'); 
colUnidad.classList.add('col-unidad'); 
colUnidad.textContent = `2816,97€`

const colTotal = document.createElement('div'); 
colTotal.classList.add('col-total'); 
colTotal.textContent = `2816,97€`

nodoProductList.appendChild(colUnidad); 
nodoProductList.appendChild(colTotal); 



