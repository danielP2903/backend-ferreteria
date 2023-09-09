import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { PurchaserController } from '../purchase/controllers/purchaseController';

const router = Router();


const purchaseController = new PurchaserController();
router.get('/',[validarJWT], purchaseController.getPurchase);
router.post('/',[validarJWT], purchaseController.savePurchase);
router.put('/',[validarJWT], purchaseController.updatePurchase);
router.delete('/:id',[validarJWT], purchaseController.deletePurchase);


export default router;