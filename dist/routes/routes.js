"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const addressRoute_1 = __importDefault(require("./addressRoute"));
function default_1(app) {
    app.use('/auth', authRoute_1.default);
    app.use('/address', addressRoute_1.default);
    app.get('/test', (req, res, next) => {
        res.status(200).json({
            status: 'success',
            message: 'Hello world',
        });
    });
    app.all('*', (req, res, next) => {
        const err = new Error(`Route ${req.originalUrl} does not exist`);
        err.statusCode = 404;
        next(err);
    });
}
exports.default = default_1;
