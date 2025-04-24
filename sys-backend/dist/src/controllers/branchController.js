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
exports.deleteBranch = exports.updateBranch = exports.getBranchById = exports.getALLBranches = exports.createBranch = void 0;
const branch_1 = require("../models/branch");
//Crea y guarda un nuevo empleado
const createBranch = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    const branch = Object.assign({}, req.body);
    branch_1.Branch.create(branch)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Branch successfully created",
            payload: data,
        });
        return;
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened registering the Branch. " + err.message,
            payload: null,
        });
        return;
    });
};
exports.createBranch = createBranch;
//Muestra todos los empleados de la base de datos
const getALLBranches = (req, res) => {
    //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
    branch_1.Branch.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Branchs successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all Branchs. " + err.message,
            payload: null,
        });
    });
};
exports.getALLBranches = getALLBranches;
//Encuentra un solo producto en base a su id
const getBranchById = (req, res) => {
    branch_1.Branch.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Branch successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened while searching the Branch. " + err.message,
            payload: null,
        });
    });
};
exports.getBranchById = getBranchById;
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BranchId = parseInt(req.params.id);
    try {
        yield branch_1.Branch.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Branch updated' });
    }
    catch (err) {
        res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}` });
        console.log(`Error updatingBranch with id: ${req.params.id}`);
    }
});
exports.updateBranch = updateBranch;
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield branch_1.Branch.destroy({ where: { id } });
        res.status(200).json({ message: "Branch deleted" });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting Branch",
            error,
        });
        return;
    }
});
exports.deleteBranch = deleteBranch;
