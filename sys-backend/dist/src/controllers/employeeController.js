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
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getALLEmployees = exports.createEmployee = void 0;
const employee_1 = require("../models/employee");
//Crea y guarda un nuevo empleado
const createEmployee = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    const employee = Object.assign({}, req.body);
    employee_1.Employee.create(employee)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Employee successfully created",
            payload: data,
        });
        return;
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened registering the employee. " + err.message,
            payload: null,
        });
        return;
    });
};
exports.createEmployee = createEmployee;
//Muestra todos los empleados de la base de datos
const getALLEmployees = (req, res) => {
    //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
    employee_1.Employee.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Employees successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all employees. " + err.message,
            payload: null,
        });
    });
};
exports.getALLEmployees = getALLEmployees;
//Encuentra un solo producto en base a su id
const getEmployeeById = (req, res) => {
    employee_1.Employee.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Employee successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened while searching the employee. " + err.message,
            payload: null,
        });
    });
};
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = parseInt(req.params.id);
    try {
        yield employee_1.Employee.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Employee updated' });
    }
    catch (err) {
        res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}` });
        console.log(`Error updatingemployee with id: ${req.params.id}`);
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield employee_1.Employee.destroy({ where: { id } });
        res.status(200).json({ message: "Employee deleted" });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting employee",
            error,
        });
        return;
    }
});
exports.deleteEmployee = deleteEmployee;
