require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import config from 'config'
import connectDB from './utils/connectDB'
import routes from './routes/routes'
import { getEnv } from './utils/getEnv'

const app = express()

app.use(express.json({ limit: '10kb' }))

const port = process.env.PORT
const env = process.env.NODE_ENV

const dbUrl = getEnv()

routes(app)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error'
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}, ${env} environment`)
    connectDB(dbUrl)
})
