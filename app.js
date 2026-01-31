'use-strict'

// Importamos datos y clases
import { DB_promesa } from './data.js'; 
import { Carrito } from './carrito.js'; 

// Importamos solo lo necesario para el inicio visual
import { pintaProductoWeb, pintarTotalCarrito } from './ui.js'; 


async function iniciarApp() {

  // 1. DATOS
  const DB = await DB_promesa; 
  const currency = DB.currency; 
  const productos = DB.products; 

 // 2. Creamos el Carrito
  const miCarrito = new Carrito(productos);


  // 3. UI Inicial - Catálogo productos (parte izquierda)
  for(let producto of productos){
      pintaProductoWeb(producto, currency,miCarrito); 
  }

  // 4. UI Inicial - Carrito (parte derecha)
  const estadoInicial = miCarrito.obtenerCarrito();
  pintarTotalCarrito(estadoInicial, currency);

}

// Arrancar
iniciarApp();