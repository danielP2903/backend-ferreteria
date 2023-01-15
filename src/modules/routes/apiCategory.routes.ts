import { Router } from "express";
import { CategoryController } from '../categories/controller/categoryController';

const router = Router();


const categoryController = new CategoryController();
router.get('/', categoryController.getCategories);
router.post('/', categoryController.saveCategory);
router.put('/', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


export default router;