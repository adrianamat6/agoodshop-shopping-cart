'use-strict'

import { DB_promesa } from './data.js'; 
import { Carrito } from './carrito.js'; 
import {
  pintaProductoWeb,
  pintarNumerosActualizados,
  pintarTotalCarrito
} from './ui.js'; 


// Iniciamos
const DB = await DB_promesa; 
const currency = DB.currency; 
const productos = DB.products; 

// Pintamos productos que nos llegan desde API
for(let producto of DB.products){
    pintaProductoWeb(producto,currency); 
}

// 
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

  const cantidad = miCarrito.obtenerCantidad(sku_pulsado);
  if(esSumar){
    miCarrito.actualizarUnidades(sku_pulsado, cantidad+1);
  }else{
    const cantidad_restada = Math.max(0,cantidad-1); 
    miCarrito.actualizarUnidades(sku_pulsado, cantidad_restada);
  }



  const cantidad_actualizada = miCarrito.obtenerCantidad(sku_pulsado);
  const botonUnidades = document.querySelector(`#unidades-${sku_pulsado}`);
  pintarNumerosActualizados(botonUnidades,cantidad_actualizada,false,currency);


  const nodoProductoTotal = document.querySelector(`.col-total[data-sku="${sku_pulsado}"]`);
  const total_actualizado = miCarrito.obtenerTotalPorSku(sku_pulsado); 
  pintarNumerosActualizados(nodoProductoTotal,total_actualizado,true,currency); 


  const infoCarrito = miCarrito.obtenerCarrito();
  pintarTotalCarrito(infoCarrito,currency); 



}; 






// ----------------------------------------------------------------------------------



