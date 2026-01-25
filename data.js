'use-strict'

const promesa = fetch('https://api.jsonblob.com/019bf66b-0964-77bc-9cb7-c50ae16bee29');

// Asignamos el resultado de la cadena de promesas a la variable que exportamos
export const DB_promesa = promesa.then((respuesta) => {
    return respuesta.json();
}).then(datos => {
    //console.log('Datos recibidos:', datos);
    return datos; 
}).catch(error => {
    console.log('Error', error);
});

