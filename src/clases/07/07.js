import express from 'express'

const app = express()
const port = 3000

/* 
  METODO GET: puede o no puede tener ID y no tiene body, pues no queremos mandar nada al sv. Queres que entregue a todos los recursos (en este caso no pones id) o un recurso en especial (en este caso con id)
  METODO PUT: obligatoriamente tiene ID y ademas un body para actualizar el recurso.
  METODO POST: no le mando ID pero obligatoriamente le mando body para saber que quiero crear.
  METODO DELETE: le mandas solo ID para saber que recurso eliminar.
*/

const users = [];

app.use(express.json()) // middleware que convierte los datos en un objeto de js

app.get('/users', (req, res) => {
  res.json({ message: users })
})

app.get('/users/:emailId', (req, res) => {
  const {emailId} = req.params
  
  const user = users.find(user => user.email === emailId)

  if (!user) return res.status(404).json({ error: 'User not found' })

})

app.post('/users', (req, res) => {
  const { name, lastname, email } = req.body

  const newUser = {
    name,
    lastname,
    email
  }

  users.push(newUser)

  res.status(201).json({ message: 'User created' }) // 200 es succesfull, 201 es created
})

app.put('/users/:emailId', (req, res) => {
  const { emailId } = req.params

  const { name, lastname, email } = req.body

  if (!name || !lastname || !email) return res.status(404).json({ error: 'Bad request' })

  const user = users.find(user => user.email === emailId)

  if (!user) return res.status(404).json({ error: 'User not found' })

  user.name = name
  user.lastname = lastname
  user.email = email

  res.json({ message: 'User updated' })
})

// DIFERENCIA ENTRE PUT Y PATCH:
/* Con el metodo patch, se actualizaran aquellos campos que son completados, a diferencia de put, que al no calocar algun campo en especifico, se rompera la linea de ejecucion. El patch te va a obligar a hacer la verificacion de cuales datos si vienen para actualizar solo esos datos.*/

app.patch('/users/:emailId', (req, res) => {
  const { emailId } = req.params

  const { name, lastname, email } = req.body

  const user = users.find(user => user.email === emailId)

  if (!user) return res.status(404).json({ error: 'User not found' })

  user.name = name
  user.lastname = lastname
  user.email = email

  res.json({ message: 'User updated' })
})

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.delete('/users/:emailId', (req, res) => {
  const { emailId } = req.params

  const userIndex = users.findIndex(user => user.email === emailId)

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' })

  users.splice(userIndex, 1)
  // splice toma dos parametros, el primero es donde arranca y el segundo la cantidad a eliminar

  res.json({ message: 'User deleted' })
})

app.listen(port, () => {
  console.log(`Server runnin at port ${port}`);
})