const express = require('express')
const dbConnect = require('./dbConnect')

const app = express()
const port = 5000
// app.use(express.json)

const itemsRoute = require('./routes/itemsRoute')
app.use('/api/items/', itemsRoute)

app.get('/', (req, res) => res.send('Home API'))
app.listen(port, () => console.log(`Node Server running on port ${port}!`))