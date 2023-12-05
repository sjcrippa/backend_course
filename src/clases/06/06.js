import express from "express";

const app = express()

const port = 3000

app.get('/users', (req, res) => {
  res.json({ message: users })
})

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.post('/users', (req, res) => {
  const { name, lastname, email } = req.body

  const newUser = {
    name: name,
    lastname: lastname,
    email: email
  }
  users.push
})

app.listen(port, () => {
  console.log('Server running on port: ', port);
})