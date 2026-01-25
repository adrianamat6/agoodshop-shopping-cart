'use-strict'

// 1. IMPORTACIONES FUNCIONES DE OTRAS HOJAS JS
import { DB_promesa } from './data.js'; 
import { Carrito } from './carrito.js'; 
import {
  pintaProductoWeb,
  pintarNumerosActualizados,
  pintarTotalCarrito
} from './ui.js'; 


// 2. FUNCIÓN PRINCIPAL 
async function iniciarApp() {

  // A. Obtener datos (Esperamos a que lleguen)
  const DB = await DB_promesa; 
  const currency = DB.currency; 
  const productos = DB.products; 

  // B. Pintar el catálogo de productos
  for(let producto of productos){
      pintaProductoWeb(producto, currency); 
  }

  // C. Iniciar el cerebro del Carrito
  const miCarrito = new Carrito(productos);

  // D. Pintar estado inicial (Carrito vacío)
  const estadoInicial = miCarrito.obtenerCarrito();
  pintarTotalCarrito(estadoInicial, currency);

  // E. Activar los botones (Event Listeners)
  activarBotones(miCarrito, currency);
}


// 3. FUNCIÓN PARA ACTIVAR LOS ESCUCHADORES
function activarBotones(carrito, currency) {
    // Seleccionamos los botones AHORA (porque ya existen en el HTML)
    const botones = document.querySelectorAll('.sumar, .restar');

    for (let btn of botones){
        btn.addEventListener('click', (event) => {
            // Cuando hacen click, llamamos a la lógica pasándole el carrito y la moneda
            gestionarClickBoton(event, carrito, currency);
        }); 
    }; 
}


// 4. LÓGICA DEL CLICK (CONTROLADOR)
function gestionarClickBoton(event, carrito, currency) {
    
    const botonPulsado = event.target; 
    const sku = botonPulsado.dataset.sku; 
    const esSumar = botonPulsado.classList.contains('sumar'); 

    // 1. Actualizar Lógica (Cerebro)
    const cantidadActual = carrito.obtenerCantidad(sku);
    let nuevaCantidad;

    if (esSumar) {
        nuevaCantidad = cantidadActual + 1;
    } else {
        nuevaCantidad = Math.max(0, cantidadActual - 1);
    }

    carrito.actualizarUnidades(sku, nuevaCantidad);

    // 2. Actualizar Vista (UI)
    
    // A. El número entre los botones
    const nodoCantidad = document.querySelector(`#unidades-${sku}`);
    pintarNumerosActualizados(nodoCantidad, nuevaCantidad, false, currency);

    // B. El total de esa fila
    const nodoTotalFila = document.querySelector(`.col-total[data-sku="${sku}"]`);
    const totalFila = carrito.obtenerTotalPorSku(sku); 
    pintarNumerosActualizados(nodoTotalFila, totalFila, true, currency); 

    // C. El resumen general (derecha)
    const infoCarrito = carrito.obtenerCarrito();
    pintarTotalCarrito(infoCarrito, currency); 
}

// 5. ARRANCAR LA APP
iniciarApp();