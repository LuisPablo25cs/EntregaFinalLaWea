import { Router, Request, Response } from "express";

import productRouter from "./productRoutes";
import employeeRouter from "./employeeRoutes";
import branchRouter from "./branchRoutes";
import adminRouter from "./adminRoutes";
const apiRouter = Router(); 

apiRouter.use("/product", productRouter);
apiRouter.use("/employee", employeeRouter);
apiRouter.use("/branch", branchRouter); 
apiRouter.use("/login", adminRouter);

apiRouter.get('/', (req:Request, res:Response)=>{
    res.send("Hello there")
}); 
export default apiRouter; 
