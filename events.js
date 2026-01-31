'use strict'

import { pintarNumerosActualizados, pintarTotalCarrito } from './ui.js';

export function gestionarClickBoton(event, carrito, currency) {
    
    const botonPulsado = event.target; 
    const sku = botonPulsado.dataset.sku; 
    const esSumar = botonPulsado.classList.contains('sumar'); 

    console.log('pulsado')
    // 1. Preguntamos a la clase la cantidad actual
    const cantidadActual = carrito.obtenerCantidad(sku);
    let nuevaCantidad;

    if (esSumar) {
        nuevaCantidad = cantidadActual + 1;
    } else {
        nuevaCantidad = Math.max(0, cantidadActual - 1);
    }

    carrito.actualizarUnidades(sku, nuevaCantidad);

    // 2. Actualizar la vista (UI)
    
    // A. Número individual
    const nodoCantidad = document.querySelector(`#unidades-${sku}`);
    pintarNumerosActualizados(nodoCantidad, nuevaCantidad, false, currency);

    // B. Total fila
    const nodoTotalFila = document.querySelector(`.col-total[data-sku="${sku}"]`);
    const totalFila = carrito.obtenerTotalPorSku(sku); 
    pintarNumerosActualizados(nodoTotalFila, totalFila, true, currency); 

    // C. Total Global
    const infoCarrito = carrito.obtenerCarrito();
    pintarTotalCarrito(infoCarrito, currency); 
}
