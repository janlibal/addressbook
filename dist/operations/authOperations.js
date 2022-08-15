"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const config_1 = __importDefault(require("config"));
const authRepository_1 = require("../repositories/authRepository");
const accessTokenCookieOptions = {
    expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 6000),
    maxAge: config_1.default.get('accessTokenExpiresIn') * 6000,
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true;
const register = (credentials, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        email: credentials.email,
        password: credentials.password,
    };
    const existingUser = yield (0, authRepository_1.checkIfUserExist)(input.email);
    if (existingUser)
        return res.status(400).json({ message: 'User already registered.' });
    const user = yield (0, authRepository_1.createNewUser)(input);
    const { access_token } = yield (0, authRepository_1.signToken)(user._id);
    return { user, access_token };
});
exports.register = register;
const login = (credentials, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        email: credentials.email,
        password: credentials.password,
    };
    const existingUser = yield (0, authRepository_1.checkIfUserExist)(input.email);
    if (!existingUser)
        return res.status(400).json({ message: 'User does not exist.' });
    const isPasswordCorrect = yield (0, authRepository_1.checkPassword)(input.password, existingUser.password);
    if (!isPasswordCorrect)
        return res.status(400).json({ message: 'Invalid credentials.' });
    const { access_token } = yield (0, authRepository_1.signToken)(existingUser._id);
    return { existingUser, access_token };
});
exports.login = login;
