import { RequestHandler, Request,Response } from "express";
import { Admin } from "../models/admin";
import { Json } from "sequelize/types/utils";


export const createAdmin: RequestHandler = (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }
  const admin = { ...req.body };
  Admin.create(admin)
    .then((data: Admin | null) => {
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ where: { email } });

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    res.json({ message: 'Login exitoso', user });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const getALLAdmins: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Admin.findAll()
   .then((data: Admin[]) => {
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
}

export const getAdminById: RequestHandler = (req: Request, res: Response) =>{
    Admin.findByPk(req.params.id)
  .then((data: Admin | null) => {
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

}

export const updateAdmin = async (req: Request, res: Response) => {
  const AdminId = parseInt(req.params.id);
  try {
    await Admin.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Admin updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating emlpoyee with id: ${req.params.id}`});
    console.log(`Error updatingAdmin with id: ${req.params.id}`)
  }
};

export const deleteAdmin: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Admin.destroy({ where: { id } });
      res.status(200).json({ message: "Admin deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting Admin",
         error,
        });
        return;
    }   
}


