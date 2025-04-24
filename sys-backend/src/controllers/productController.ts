import { RequestHandler, Request,Response } from "express";
import { Product } from "../models/product";
import { Json } from "sequelize/types/utils";

//Crea y guarda un nuevo producto
export const createProduct: RequestHandler = (req: Request, res: Response) => {
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
  const product = { ...req.body };
  Product.create(product)
    .then((data: Product | null) => {
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


//Muestra todos los proudctos de la base de datos
export const getALLProducts: RequestHandler = (req: Request, res: Response) =>{
      //Calling the Sequelize findAll method. This is the same that a SELECT * FROM PRODUCT in a SQL query.
   Product.findAll()
   .then((data: Product[]) => {
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
}
//Encuentra un solo producto en base a su id
export const getProductById: RequestHandler = (req: Request, res: Response) =>{
    Product.findByPk(req.params.id)
  .then((data: Product | null) => {
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

}

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: `Error updating product with id: ${req.params.id}`});
    console.log(`Error updating product with id: ${req.params.id}`)
  }
};

export const deleteProduct: RequestHandler = async(req: Request, res: Response) =>{
    const { id } = req.params;
    try {
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: "Product deleted" });
      return;
    } catch (error) {
        res.status(500).json({
         message: "Error deleting products",
         error,
        });
        return;
    }   
}
