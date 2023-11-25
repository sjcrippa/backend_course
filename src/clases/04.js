const fs = require('fs')

// EJEMPLO FS SINCRONICO:

fs.writeFileSync('./ejemplo.txt', 'Hola archivo creado ')

if (fs.existsSync('./ejemplo.txt')) {
  let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
  console.log(contenido);

  fs.appendFileSync('./ejemplo.txt', 'y actualizado')
  contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
  console.log(contenido);

  fs.unlinkSync('./ejemplo.txt') // elimina el archivo
  console.log('Archivo eliminado');
}

// EJEMPLO FS con CALLBACKS:
// Esto puede presentar una posible situacion de callback-hell. 

fs.writeFile('./ejemploCb.txt', 'Hola archivo callbacks. ', (error) => {
  if (error) return console.log('Error al escribir el archivo')

  fs.readFile('./ejemploCb.txt', 'utf-8', (error, resultado) => {
    if (error) return console.log('Error al leer el archivo');
    console.log(resultado);

    fs.appendFile('./ejemploCb.txt', 'Y actualizado', (error) => {
      if (error) return console.log('Error al actualizar el archivo');

      fs.readFile('./ejemploCb.txt', 'utf-8', (error, resultado) => {
        if (error) return console.log('Error al leer el archivo');
        console.log(resultado);

        fs.unlink('./ejemploCb.txt', (error) => {
          if (error) return console.log('Error al eliminar el archivo');
          console.log('Archivo eliminado');

        })
      })
    })
  })
})

// EJEMPLO FS CON PROMESAS: 

const operacionsAsincronas = async () => {
  await fs.promises.writeFile('./ejemploPromesas.txt' , 'Hola archivos con promesas ')

  let resultado = await fs.promises.readFile('./ejemploPromesas.txt', 'utf-8')
  console.log(resultado);

  await fs.promises.appendFile('./ejemploPromesas.txt', 'Y archivo actualizado')
  resultado = await fs.promises.readFile('./ejemploPromesas.txt' , 'utf-8')
  console.log(resultado);

  await fs.promises.unlink('./ejemploPromesas.txt')
  console.log('Archivo eliminado');
}

operacionsAsincronas();

