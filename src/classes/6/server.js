import express  from "express"

const app = express()

app.get('/api',(req,res)=>{
  res.send('probando')
})

app.listen(8080,()=>{
  console.log('Escuchando puerto 8080');
})