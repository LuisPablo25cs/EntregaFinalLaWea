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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getALLProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
//Crea y guarda un nuevo producto
const createProduct = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    // Save Product in the database
    const product = Object.assign({}, req.body);
    product_1.Product.create(product)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: data,
        });
        return;
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product. " + err.message,
            payload: null,
        });
        return;
    });
};
exports.createProduct = createProduct;
//Muestra todos los proudctos de la base de datos
const getALLProducts = (req, res) => {
    //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
    product_1.Product.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Products successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    });
};
exports.getALLProducts = getALLProducts;
//Encuentra un solo producto en base a su id
const getProductById = (req, res) => {
    product_1.Product.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Products successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    });
};
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    try {
        yield product_1.Product.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Product updated' });
    }
    catch (err) {
        res.status(500).json({ error: `Error updating product with id: ${req.params.id}` });
        console.log(`Error updating product with id: ${req.params.id}`);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield product_1.Product.destroy({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting products",
            error,
        });
        return;
    }
});
exports.deleteProduct = deleteProduct;
