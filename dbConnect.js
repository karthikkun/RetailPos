const mongoose = require('mongoose')
const CONN_URL = "mongodb+srv://db-user:db-user@cluster0.hndex.mongodb.net/retail-pos"

 mongoose.connect(CONN_URL).then(
    () => { console.log(`mongodb conn success`) },
    err => { console.log(`mongodb conn failure : ${err}`) }
 )
let connObj = mongoose.connection
