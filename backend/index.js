const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is my first mongoDb Project')
})


app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})