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
exports.saveContact = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const key_json_1 = __importDefault(require("../firestore/key.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(key_json_1.default),
});
const _db = firebase_admin_1.default.firestore();
const saveContact = (contact, userEmail, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield _db.collection(userEmail).doc(fullName).set(contact);
});
exports.saveContact = saveContact;
