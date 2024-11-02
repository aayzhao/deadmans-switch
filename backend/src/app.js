import dotenv from 'dotenv'
import express from 'express'
import dbConnect from '../db/dbConnect.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

dbConnect()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})