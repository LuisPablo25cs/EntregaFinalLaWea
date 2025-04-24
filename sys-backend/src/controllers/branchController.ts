import { RequestHandler, Request,Response } from "express";
import { Branch } from "../models/branch";
import { Json } from "sequelize/types/utils";

//Crea y guarda un nuevo empleado
export const createBranch: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const branch = { ...req.body };
  Branch.create(branch)
    .then((data: Branch | null) => {
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


//Muestra todos los empleados de la base de datos
export const getALLBranches: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Branch.findAll()
   .then((data: Branch[]) => {
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
}
//Encuentra un solo producto en base a su id
export const getBranchById: RequestHandler = (req: Request, res: Response) =>{
    Branch.findByPk(req.params.id)
  .then((data: Branch | null) => {
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

}

export const updateBranch = async (req: Request, res: Response) => {
  const BranchId = parseInt(req.params.id);
  try {
    await Branch.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Branch updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingBranch with id: ${req.params.id}`)
  }
};

export const deleteBranch: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Branch.destroy({ where: { id } });
      res.status(200).json({ message: "Branch deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Branch",
         error,
        });
        return;
    }   
}
