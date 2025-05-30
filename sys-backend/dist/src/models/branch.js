"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = require("./product");
const employee_1 = require("./employee");
let Branch = class Branch extends sequelize_typescript_1.Model {
};
exports.Branch = Branch;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Branch.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_1.Product),
    __metadata("design:type", Array)
], Branch.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => employee_1.Employee),
    __metadata("design:type", Array)
], Branch.prototype, "employees", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
exports.Branch = Branch = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Branches"
    })
], Branch);
