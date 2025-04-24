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
exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getALLAdmins = exports.login = exports.createAdmin = void 0;
const admin_1 = require("../models/admin");
const createAdmin = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    const admin = Object.assign({}, req.body);
    admin_1.Admin.create(admin)
        .then((data) => {
        res.status(200).json({
            status: "success",
            message: "Admin successfully created",
            payload: data,
        });
        return;
    })
        .catch((err) => {
        res.status(500).json({
            status: "error",
            message: "Something happened registering the Admin. " + err.message,
            payload: null,
        });
        return;
    });
};
exports.createAdmin = createAdmin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield admin_1.Admin.findOne({ where: { email } });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }
        res.json({ message: 'Login exitoso', user });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.login = login;
const getALLAdmins = (req, res) => {
    //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
    admin_1.Admin.findAll()
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Admins successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened retrieving all Admins. " + err.message,
            payload: null,
        });
    });
};
exports.getALLAdmins = getALLAdmins;
const getAdminById = (req, res) => {
    admin_1.Admin.findByPk(req.params.id)
        .then((data) => {
        return res.status(200).json({
            status: "success",
            message: "Admin successfully retrieved",
            payload: data,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            status: "error",
            message: "Something happened while searching the Admin. " + err.message,
            payload: null,
        });
    });
};
exports.getAdminById = getAdminById;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminId = parseInt(req.params.id);
    try {
        yield admin_1.Admin.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Admin updated' });
    }
    catch (err) {
        res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}` });
        console.log(`Error updatingAdmin with id: ${req.params.id}`);
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield admin_1.Admin.destroy({ where: { id } });
        res.status(200).json({ message: "Admin deleted" });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting Admin",
            error,
        });
        return;
    }
});
exports.deleteAdmin = deleteAdmin;
