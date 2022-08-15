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
exports.addressHandler = void 0;
const addressOperations_1 = require("../operations/addressOperations");
const addressHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const userEmail = user.email;
        const address = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
        };
        const contact = yield (0, addressOperations_1.createContact)(address, userEmail);
        res.status(200).json({
            status: 'success',
            user: user.email,
            contact: contact,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Incorrect input parameters',
            });
        }
        next(err);
    }
});
exports.addressHandler = addressHandler;
