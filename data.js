'use-strict'

const promesa = fetch('https://api.jsonblob.com/019bfbff-2bee-75dc-bda1-006522f1260e');

// Asignamos el resultado de la cadena de promesas a la variable que exportamos
export const DB_promesa = promesa.then((respuesta) => {
    return respuesta.json();
}).then(datos => {
    //console.log('Datos recibidos:', datos);
    return datos; 
}).catch(error => {
    console.log('Error', error);
});

