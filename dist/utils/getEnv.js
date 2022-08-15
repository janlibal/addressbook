"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const config_1 = __importDefault(require("config"));
const getEnv = () => {
    const env = process.env.NODE_ENV;
    let dbConnection;
    let dbUrl;
    const dbLocalUsr = config_1.default.get('dbLocalName');
    const dbLocalPwd = config_1.default.get('dbLocalPass');
    const dbProdUsr = config_1.default.get('dbProdName');
    const dbProdPwd = config_1.default.get('dbProdPass');
    if (env === 'production') {
        dbConnection = process.env.CONNECTION_PROD;
        dbUrl = `mongodb+srv://${dbProdUsr}:${dbProdPwd}@${dbConnection}`;
    }
    else {
        dbConnection = process.env.CONNECTION_DEV;
        dbUrl = `mongodb://${dbLocalUsr}:${dbLocalPwd}@${dbConnection}`;
    }
    return dbUrl;
};
exports.getEnv = getEnv;
