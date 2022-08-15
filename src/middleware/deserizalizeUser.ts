import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import { verifyJwt } from '../utils/jwt'
import { findUserById } from '../repositories/authRepository'

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let access_token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token
        }

        if (!access_token) {
            return next(new AppError('You are not logged in', 401))
        }

        const decoded = verifyJwt<{ sub: string }>(access_token)

        if (!decoded) {
            return next(
                new AppError(`Invalid token or user doesn't exist`, 401)
            )
        }

        if (!access_token) {
            return next(
                new AppError(`Invalid token or user doesn't exist`, 401)
            )
        }

        const _id = decoded.sub

        const user = await findUserById(_id)

        res.locals.user = user

        next()
    } catch (err: any) {
        next(err)
    }
}
