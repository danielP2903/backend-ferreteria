import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { ProductsController } from '../products/controllers/productController';

const router = Router();


const  productsController = new ProductsController();
router.get('/',[validarJWT],productsController.getProducts);
router.get('/:id',[validarJWT] ,productsController.getById);
router.post('/',[validarJWT], productsController.saveProduct);
router.put('/',[validarJWT], productsController.updateProduct);
router.delete('/:id',[validarJWT] ,productsController.deleteProduct);


export default router;