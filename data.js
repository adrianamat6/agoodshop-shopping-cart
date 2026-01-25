'use-strict'

const promesa = fetch('https://api.jsonblob.com/019bf134-8560-7a33-ac96-0fb805dca64f');

// Asignamos el resultado de la cadena de promesas a la variable que exportamos
export const DB_promesa = promesa.then((respuesta) => {
    return respuesta.json();
}).then(datos => {
    //console.log('Datos recibidos:', datos);
    return datos; 
}).catch(error => {
    console.log('Error', error);
});

