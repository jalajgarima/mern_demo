import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import {
  notFound,
  errorhandler,
} from '../backend/middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const PORT = process.env.PORT || 5000

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
}
/* else {
  app.get('/', (req, res) => {
    res.send('API is Running ... ')
  })
} */

/* if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} */
app.use(notFound)

app.use(errorhandler)

app.listen(
  PORT,
  console.log(
    `Server in ${process.env.NODE_ENV} is running on port ${PORT}`.yellow.bold
  )
)
