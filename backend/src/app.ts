import express from 'express'
import cors from 'cors'
import { config } from './config/env'
import authRoutes from './routes/authRoutes'
import analysisRoutes from './routes/analysisRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server is ready!' })
})

app.use('/auth', authRoutes)
app.use('/', analysisRoutes)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
  console.log(`Address: http://localhost:${config.port}`)
})