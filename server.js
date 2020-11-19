//Imports
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const connectDB = require('./database/db')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)




connectDB()

app.get('/', (req,res) => {
    res.send("Inside Server")
})

const port = process.env.PORT || 5000


if(process.env.NODE === "production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(port , () => {console.log(`Listening on port ${port}`)})
