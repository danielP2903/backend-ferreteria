import { Router } from "express";
import { ProductsController } from '../products/controllers/productController';

const router = Router();


const  productsController = new ProductsController();
router.get('/', productsController.getProducts);
router.post('/', productsController.saveProduct);
router.put('/', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);


export default router;