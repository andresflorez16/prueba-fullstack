const express = require('express')
require('./database')()
const cors = require('cors')

const app = express()

app.set('port', 5000)

app.use(express.json())
app.use(cors({ origin: '*', methods: "GET,PUT,POST,DELETE" }))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(require('./routes/users'))
app.use(require('./routes/posts'))

app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

module.exports = app
