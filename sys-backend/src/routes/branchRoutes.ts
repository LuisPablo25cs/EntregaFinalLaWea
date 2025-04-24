import { Router } from "express";
import { getALLBranches, getBranchById, createBranch, deleteBranch, updateBranch
} from "../controllers/branchController"

const branchRouter:Router = Router(); 

branchRouter.get('/', getALLBranches); 

branchRouter.get('/:id', getBranchById);

branchRouter.post('/', createBranch);

branchRouter.patch('/:id', updateBranch);

branchRouter.delete('/:id', deleteBranch);

export default branchRouter; 

