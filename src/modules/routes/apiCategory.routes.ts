import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { CategoryController } from '../categories/controller/categoryController';

const router = Router();


const categoryController = new CategoryController();
router.get('/',[validarJWT], categoryController.getCategories);
router.post('/',[validarJWT], categoryController.saveCategory);
router.put('/',[validarJWT], categoryController.updateCategory);
router.delete('/:id',[validarJWT], categoryController.deleteCategory);


export default router;