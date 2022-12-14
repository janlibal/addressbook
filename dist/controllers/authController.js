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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = exports.registerHandler = void 0;
const authOperations_1 = require("../operations/authOperations");
const registerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = yield (0, authOperations_1.register)(credentials, res);
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Error while registering new user',
            });
        }
        next(err);
    }
});
exports.registerHandler = registerHandler;
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = yield (0, authOperations_1.login)(credentials, res);
        res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Error while signing in',
            });
        }
        next(err);
    }
});
exports.loginHandler = loginHandler;
