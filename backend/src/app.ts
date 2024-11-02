import dotenv from 'dotenv'
import express, { Express } from 'express'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
const dbConnect = require('./db/dbConnect')

dbConnect()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})