// Initialize all libraries
const express = require('express')

const app = express()

// initialize cors
const cors = require('cors')
app.use(cors())

// initialize body-parser
const bodyParser = require('body-parser')
const { response } = require('express')
app.use(express.json())

// initialize port
const port = 4000

// initialize router
const authenticRouter = require('./router/authenticRouter')
const productRouter = require('./router/productRouter')

// initialize route
app.use('/authentic-system', authenticRouter)
app.use('/authentic-system', productRouter)

app.listen(port, ()=> console.log(`API RUNNING ON PORT ${port}`))