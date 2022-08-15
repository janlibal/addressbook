import {
    DocumentType,
    getModelForClass,
    index,
    prop,
} from '@typegoose/typegoose'

@index({ email: 1 })
export class User {
    @prop({ unique: true, required: true })
    email: string

    @prop({ required: true, minlength: 8, maxLength: 64, select: false })
    password: string
}

const userModel = getModelForClass(User)
export default userModel
