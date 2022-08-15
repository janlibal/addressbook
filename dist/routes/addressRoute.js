"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deserizalizeUser_1 = require("../middleware/deserizalizeUser");
const addressController_1 = require("../controllers/addressController");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const addressSchema_1 = require("../schemas/addressSchema");
const router = express_1.default.Router();
router.use(deserizalizeUser_1.deserializeUser, requireUser_1.requireUser);
router.post('/new', (0, validate_1.validate)(addressSchema_1.createAddressSchema), addressController_1.addressHandler);
exports.default = router;
