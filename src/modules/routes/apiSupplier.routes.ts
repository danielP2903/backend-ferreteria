import { Router } from "express";
import { SupplierController } from '../suppliers/controller/supplierController';

const router = Router();


const supplierController = new SupplierController();
router.get('/', supplierController.getSuppliers);
router.post('/', supplierController.saveSupplier);
router.put('/', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);



export default router;