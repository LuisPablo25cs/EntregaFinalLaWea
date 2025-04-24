import { Router, Request, Response } from "express";
import {
    createEmployee, 
    deleteEmployee, 
    getALLEmployees, 
    getEmployeeById, 
    updateEmployee
} from "../controllers/employeeController"

const employeeRouter:Router = Router(); 

employeeRouter.get('/', getALLEmployees);

employeeRouter.get('/:id', getEmployeeById);

employeeRouter.post('/', createEmployee);

employeeRouter.patch('/:id', updateEmployee);

employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter; 

