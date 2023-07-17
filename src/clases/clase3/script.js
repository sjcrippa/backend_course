/* function operacionAsincronica(parametro1, parametro2, callback) {
    // Realizar alguna operación asincrónica
    // ...

    // Una vez que la operación asincrónica se completa, llamar a la callback
    callback(resultado);
}

function miCallback(resultado) {
    // Manejar el resultado de la operación asincrónica
    console.log("El resultado es: " + resultado);
}

// Llamar a la función asincrónica y pasar la callback como parámetro
operacionAsincronica(5, 10, miCallback); */

//--------------------------------------------------------

function escribirYLoguear(texto, callbackParaLoguear) {
    // simulamos que escribimos en un archivo!
    console.log(texto);
    // al finalizar, ejecutamos el callback
    callbackParaLoguear('archivo escrito con exito')
}

escribirYLoguear(
    'hola mundo de los callbacks',
    (mensajeParaLoguear) => {
        const fecha = new Date().toDateString()
        console.log(`${fecha} y ${mensajeParaLoguear}`);
    }
)

//--------------------------------------------------------

/* Definiremos una función llamada operación que reciba como parámetro dos valores y una función con la operación que va a realizar. Deberá retornar el resultado.

Definiremos las siguientes funciones: suma, resta, multiplicación, división y módulo. Estas recibirán dos valores y devolverán el resultado. Serán pasadas como parámetro en la llamada a la función operación

Todas las funciones tendrán que ser realizadas con sintaxis flecha. */

const operation = (value1, value2, fn) => {
    let result = fn(value1, value2)

    return result
}

suma =(n1, n2) => n1+n2
resta =(n1, n2) => n1-n2
multiplicacion =(n1, n2) => n1*n2
division =(n1, n2) => n1/n2
modulo =(n1, n2) => n1%n2

console.log(operation(2,4,suma))
console.log(operation(2,4,resta))
console.log(operation(2,4,multiplicacion))
console.log(operation(2,4,division))
console.log(operation(2,4,modulo))

//--------------------------------------------------------

