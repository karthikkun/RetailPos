const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnect')
const itemsRoute = require('./routes/itemsRoute')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
app.use('/api/items/', itemsRoute)

app.get('/', (req, res) => res.send('Home API'))
app.listen(port, () => console.log(`Node Server running on port ${port}!`))