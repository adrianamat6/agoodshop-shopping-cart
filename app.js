'use-strict'

// Importamos datos y clases
import { DB_promesa } from './data.js'; 
import { Carrito } from './carrito.js'; 

// Importamos solo lo necesario para el inicio visual
import { pintaProductoWeb, pintarTotalCarrito } from './ui.js'; 

// Importamos el gestor de eventos
import { activarBotones } from './events.js'; 


async function iniciarApp() {

  // 1. DATOS
  const DB = await DB_promesa; 
  const currency = DB.currency; 
  const productos = DB.products; 

  // 2. UI INICIAL (Catálogo)
  for(let producto of productos){
      pintaProductoWeb(producto, currency); 
  }

  // 3. LÓGICA (Carrito)
  const miCarrito = new Carrito(productos);

  // 4. UI INICIAL (Carrito vacío)
  const estadoInicial = miCarrito.obtenerCarrito();
  pintarTotalCarrito(estadoInicial, currency);

  // 5. INTERACCIÓN (Delegamos en events.js)
  activarBotones(miCarrito, currency);
}

// Arrancar
iniciarApp();