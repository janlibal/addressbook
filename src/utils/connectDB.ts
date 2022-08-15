import mongoose from 'mongoose'

const connectDB = async (dbUrl: any) => {
    try {
        await mongoose.connect(dbUrl)
        console.log('Database connected...')
    } catch (error: any) {
        console.log(error.message)
        console.log('there is an error')
        setTimeout(connectDB, 5000)
    }
}

export default connectDB
