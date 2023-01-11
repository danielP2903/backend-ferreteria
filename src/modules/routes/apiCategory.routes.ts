import { Router } from "express";
import { CategoryController } from '../categories/controller/categoryController';

const router = Router();


const categoryController = new CategoryController();

router.post('/', categoryController.saveCategory);
router.put('/', categoryController.updateCategory);


export default router;