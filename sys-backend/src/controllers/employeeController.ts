import { RequestHandler, Request,Response } from "express";
import { Employee } from "../models/employee";
import { Json } from "sequelize/types/utils";

//Crea y guarda un nuevo empleado
export const createEmployee: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const employee = { ...req.body };
  Employee.create(employee)
    .then((data: Employee | null) => {
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


//Muestra todos los empleados de la base de datos
export const getALLEmployees: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Employee.findAll()
   .then((data: Employee[]) => {
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
}
//Encuentra un solo producto en base a su id
export const getEmployeeById: RequestHandler = (req: Request, res: Response) =>{
    Employee.findByPk(req.params.id)
  .then((data: Employee | null) => {
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

}

export const updateEmployee = async (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.id);
  try {
    await Employee.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingemployee with id: ${req.params.id}`)
  }
};

export const deleteEmployee: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Employee.destroy({ where: { id } });
      res.status(200).json({ message: "Employee deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting employee",
         error,
        });
        return;
    }   
}
