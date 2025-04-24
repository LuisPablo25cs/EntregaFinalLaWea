"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
const branchRoutes_1 = __importDefault(require("./branchRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/product", productRoutes_1.default);
apiRouter.use("/employee", employeeRoutes_1.default);
apiRouter.use("/branch", branchRoutes_1.default);
apiRouter.use("/login", adminRoutes_1.default);
apiRouter.get('/', (req, res) => {
    res.send("Hello there");
});
exports.default = apiRouter;
