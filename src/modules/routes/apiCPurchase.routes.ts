import { Router } from "express";
import { PurchaserController } from '../purchase/controllers/purchaseController';

const router = Router();


const purchaseController = new PurchaserController();
router.get('/', purchaseController.getPurchase);
router.post('/', purchaseController.savePurchase);
router.put('/', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);


export default router;