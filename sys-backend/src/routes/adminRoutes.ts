import { Router } from "express";
import { getALLAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin, login } from "../controllers/adminContoller";

const adminRouter:Router = Router(); 

adminRouter.get('/', getALLAdmins);
adminRouter.get('/:id', getAdminById);
adminRouter.post('/', login);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.patch('/:id', updateAdmin);

export default adminRouter; 

