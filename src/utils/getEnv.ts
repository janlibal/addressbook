import config from 'config'

export const getEnv = () => {
    const env = process.env.NODE_ENV
    let dbConnection: any
    let dbUrl: any

    const dbLocalUsr = config.get<string>('dbLocalName')
    const dbLocalPwd = config.get<string>('dbLocalPass')
    const dbProdUsr = config.get<string>('dbProdName')
    const dbProdPwd = config.get<string>('dbProdPass')

    if (env === 'production') {
        dbConnection = process.env.CONNECTION_PROD
        dbUrl = `mongodb+srv://${dbProdUsr}:${dbProdPwd}@${dbConnection}`
    } else {
        dbConnection = process.env.CONNECTION_DEV
        dbUrl = `mongodb://${dbLocalUsr}:${dbLocalPwd}@${dbConnection}`
    }

    return dbUrl
}
