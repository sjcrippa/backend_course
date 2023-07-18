/* 
const temporizador = (callback, texto, time) => {
	setTimeout(() => callback(texto), time)

};

const saludo = (texto) => {
	console.log(texto);
	return texto
}
console.log("inicio del programa"); // sync
console.log(temporizador(saludo, "hola mundo!", 3000)); // async
console.log("fin del programa"); // syn
 */

// EJEMPLO SETINTERVAL

let contador = () => {
	let counter = 1;
	console.log("Realizando operacion");
	let timer = setInterval(() => {
		console.log(counter++);
		if (counter > 5) {
			clearInterval(timer)
		}
	}, 2000)
};

console.log("Iniciando tarea!");
contador();
console.log("Tarea finalizada!");
// output