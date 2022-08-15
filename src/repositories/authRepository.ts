require('dotenv').config()
import { omit } from 'lodash'
import userModel, { User } from '../models/user'
import { FilterQuery, QueryOptions } from 'mongoose'
import { signJwt } from '../utils/jwt'
import config from 'config'
import bcrypt from 'bcryptjs'
import { DocumentType } from '@typegoose/typegoose'

const excludedFields = ['password']

export const checkIfUserExist = async (email: any) => {
    const user = await userModel.findOne({ email }).select('+password')
    return user
}

export const checkPassword = async (
    candidatePassword: any,
    userPassword: any
) => {
    const isPasswordCorrect = await bcrypt.compare(
        candidatePassword,
        userPassword
    )
    return isPasswordCorrect
}

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, {}, options).select('+password')
}

export const createNewUser = async (input: any) => {
    const hashedPassword = await bcrypt.hash(input.password, 12)
    return await userModel.create({
        email: input.email,
        password: hashedPassword,
    })
}

export const findUserById = async (id: string) => {
    const user = await userModel.findById(id).lean()
    return omit(user, excludedFields)
}

export const signToken = async (user: DocumentType<User>) => {
    const userId = user._id.toString()

    const access_token = signJwt(
        { sub: userId },
        {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
        }
    )

    return { access_token }
}
