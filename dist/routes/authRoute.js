"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const userSchema_1 = require("../schemas/userSchema");
const router = express_1.default.Router();
router.post('/register', (0, validate_1.validate)(userSchema_1.createUserSchema), authController_1.registerHandler);
router.post('/login', (0, validate_1.validate)(userSchema_1.loginUserSchema), authController_1.loginHandler);
exports.default = router;
