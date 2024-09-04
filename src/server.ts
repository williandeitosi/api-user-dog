import express from 'express'
import { Request, Response } from "express"
import { userRoutes } from './routes/userRoute'

const app = express()
app.use(express.json())
app.use('/', userRoutes)

app.use('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Ola, Willian' })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})