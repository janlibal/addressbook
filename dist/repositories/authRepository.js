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
exports.signToken = exports.findUserById = exports.createNewUser = exports.findUser = exports.checkPassword = exports.checkIfUserExist = void 0;
require('dotenv').config();
const lodash_1 = require("lodash");
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const excludedFields = ['password'];
const checkIfUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email }).select('+password');
    return user;
});
exports.checkIfUserExist = checkIfUserExist;
const checkPassword = (candidatePassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcryptjs_1.default.compare(candidatePassword, userPassword);
    return isPasswordCorrect;
});
exports.checkPassword = checkPassword;
const findUser = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne(query, {}, options).select('+password');
});
exports.findUser = findUser;
const createNewUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(input.password, 12);
    return yield user_1.default.create({
        email: input.email,
        password: hashedPassword,
    });
});
exports.createNewUser = createNewUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id).lean();
    return (0, lodash_1.omit)(user, excludedFields);
});
exports.findUserById = findUserById;
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = user._id.toString();
    const access_token = (0, jwt_1.signJwt)({ sub: userId }, {
        expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
    });
    return { access_token };
});
exports.signToken = signToken;
