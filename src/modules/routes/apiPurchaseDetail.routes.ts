import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { PurchaseDetailController } from '../purchaseDetail/controller/purchaseDetailController';

const router = Router();


const purchaseDetailController = new PurchaseDetailController();
router.get('/:id',[validarJWT], purchaseDetailController.getPurchaseDetailByIdPurchase);



export default router;