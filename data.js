'use-strict'

const promesa = fetch('https://api.jsonblob.com/019c13d1-19b9-7f1c-bf7d-d515371fa9ca');

// Asignamos el resultado de la cadena de promesas a la variable que exportamos
export const DB_promesa = promesa.then((respuesta) => {
    return respuesta.json();
}).then(datos => {
    //console.log('Datos recibidos:', datos);
    return datos; 
}).catch(error => {
    console.log('Error', error);
});

