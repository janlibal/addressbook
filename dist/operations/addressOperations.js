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
exports.createContact = void 0;
const addressRepository_1 = require("../repositories/addressRepository");
const createContact = (contact, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = contact.lastName + ', ' + contact.firstName;
    const data = yield (0, addressRepository_1.saveContact)(contact, userEmail, fullName);
    return data;
});
exports.createContact = createContact;
