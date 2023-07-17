// Realizar una función que reciba un objeto, y muestre cada dos segundos sus claves y valores en este formato: [clave, valor]. El proceso no debe ser bloqueante. Utilizar las nuevas funciones de ES8: entries, async await

const delay2s = () => new Promise(resolve => {
    let refTimer = setInterval(() => resolve(refTimer), 2000)
})

async function mostrarClaveValor(obj) {
    //console.log(Object.values(obj))
    let entries = Object.entries(obj)
    for (let entrie of entries) {
        console.log(entrie)
        let refTimer = await delay2s() // el await bloquea el hilo principal de ejecucion del codigo
        clearInterval(refTimer)
    }
}

console.log('principios');
mostrarClaveValor({
    nombre: 'santiago',
    apellido: 'crippa',
    edad: '26'
})
console.log('fin');

// Copia profunda de un objeto en JS

let data = {
    name: "Joaquin",
    surname: "Cejas",
    test: {
        prop: "Coderhouse"
    }
};

let data_2 = JSON.parse(JSON.stringify(data));

// Actividad:
// - Realizar una lista nueva  (array) que contenga todos los tipos de productos (no cantidades), consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.
// - Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)

const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 2
    },
];
const tiposProductos = [];
objetos.forEach(objeto => {
    Object.keys(objeto).forEach(producto => {
        if (!tiposProductos.includes(producto)) {
            tiposProductos.push(producto);
        }
    });
});

console.log(tiposProductos);

const totalProductosVendidos = Object.values(objetos.reduce((acc, obj) => {
    for (const producto in obj) {
        if (acc[producto]) {
            acc[producto] += obj[producto];
        } else {
            acc[producto] = obj[producto];
        }
    }
    return acc;
}, {}));

console.log(totalProductosVendidos);