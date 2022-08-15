"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const routes_1 = __importDefault(require("./routes/routes"));
const getEnv_1 = require("./utils/getEnv");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10kb' }));
const port = process.env.PORT;
const env = process.env.NODE_ENV;
const dbUrl = (0, getEnv_1.getEnv)();
(0, routes_1.default)(app);
app.use((err, req, res, next) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`Server started on port: ${port}, ${env} environment`);
    (0, connectDB_1.default)(dbUrl);
});
