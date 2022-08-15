import { CookieOptions, NextFunction, Response } from 'express'
import config from 'config'
import {
    createNewUser,
    signToken,
    checkIfUserExist,
    checkPassword,
} from '../repositories/authRepository'

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 6000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 6000,
    httpOnly: true,
    sameSite: 'lax',
}

if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true

export const register = async (credentials: any, res: Response) => {
    const input = {
        email: credentials.email,
        password: credentials.password,
    }

    const existingUser = await checkIfUserExist(input.email)
    if (existingUser)
        return res.status(400).json({ message: 'User already registered.' })

    const user = await createNewUser(input)

    const { access_token } = await signToken(user._id)

    return { user, access_token }
}

export const login = async (credentials: any, res: Response) => {
    const input = {
        email: credentials.email,
        password: credentials.password,
    }

    const existingUser = await checkIfUserExist(input.email)
    if (!existingUser)
        return res.status(400).json({ message: 'User does not exist.' })

    const isPasswordCorrect = await checkPassword(
        input.password,
        existingUser.password
    )
    if (!isPasswordCorrect)
        return res.status(400).json({ message: 'Invalid credentials.' })

    const { access_token } = await signToken(existingUser._id)

    return { existingUser, access_token }
}
