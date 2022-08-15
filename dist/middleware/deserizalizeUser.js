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
exports.deserializeUser = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
const authRepository_1 = require("../repositories/authRepository");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default('You are not logged in', 401));
        }
        const decoded = (0, jwt_1.verifyJwt)(access_token);
        if (!decoded) {
            return next(new appError_1.default(`Invalid token or user doesn't exist`, 401));
        }
        if (!access_token) {
            return next(new appError_1.default(`Invalid token or user doesn't exist`, 401));
        }
        const _id = decoded.sub;
        const user = yield (0, authRepository_1.findUserById)(_id);
        res.locals.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
