import { Router } from "express";
import { SalesController } from '../sales/controller/saleController';

const router = Router();


const saleController = new SalesController();
router.get('/', saleController.getSales);
router.post('/', saleController.saveSale);
router.delete('/:id', saleController.deleteSale);


export default router;