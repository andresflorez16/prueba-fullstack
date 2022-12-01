const express = require('express')
require('./database')()
const cors = require('cors')

const app = express()

app.set('port', 5000)

app.use(express.json())
app.use(cors({ origin: '*', methods: "GET,PUT,POST,DELETE" }))

app.use(require('./routes/users'))
app.use(require('./routes/posts'))

app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

module.exports = app
