import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'


dotenv.config()
const app = express()
app.use(express.json())

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
}

mongoose.connect(mongoUri)
    .then(() => console.log('MONGODB connected'))
    .catch(() => console.log("error while connecting"))

const PORT = process.env.PORT || 8080

app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})