import { CookieOptions, NextFunction, Request, Response } from 'express'
import { CreateAddressInput } from '../schemas/addressSchema'
import { createContact } from '../operations/addressOperations'

export const addressHandler = async (
    req: Request<{}, {}, CreateAddressInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user
        const userEmail = user.email

        const address = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
        }

        const contact = await createContact(address, userEmail)

        res.status(200).json({
            status: 'success',
            user: user.email,
            contact: contact,
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Incorrect input parameters',
            })
        }
        next(err)
    }
}
