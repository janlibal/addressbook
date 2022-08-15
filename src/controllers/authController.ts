import config from 'config'
import { CookieOptions, NextFunction, Request, Response } from 'express'
import { CreateUserInput, LoginUserInput } from '../schemas/userSchema'
import { register, login } from '../operations/authOperations'

export const registerHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        }

        const user = await register(credentials, res)

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Error while registering new user',
            })
        }
        next(err)
    }
}

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        }

        const user = await login(credentials, res)

        res.status(200).json({
            status: 'success',
            data: user,
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Error while signing in',
            })
        }
        next(err)
    }
}

