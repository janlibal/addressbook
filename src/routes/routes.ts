import { NextFunction, Request, Response } from 'express'
import authRoutes from './authRoute'
import addressRoutes from './addressRoute'

export default function (app: any) {
    app.use('/auth', authRoutes)
    app.use('/address', addressRoutes)

    app.get('/test', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            status: 'success',
            message: 'Hello world',
        })
    })

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        const err = new Error(`Route ${req.originalUrl} does not exist`) as any
        err.statusCode = 404
        next(err)
    })
}
