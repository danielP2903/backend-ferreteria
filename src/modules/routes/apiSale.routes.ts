import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { SalesController } from '../sales/controller/saleController';

const router = Router();


const saleController = new SalesController();
router.get('/',[validarJWT], saleController.getSales);
router.post('/',[validarJWT], saleController.saveSale);
router.delete('/:id',[validarJWT], saleController.deleteSale);


export default router;