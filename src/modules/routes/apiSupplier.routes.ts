import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { SupplierController } from '../suppliers/controller/supplierController';

const router = Router();


const supplierController = new SupplierController();
router.get('/',[validarJWT], supplierController.getSuppliers);
router.post('/',[validarJWT], supplierController.saveSupplier);
router.put('/',[validarJWT], supplierController.updateSupplier);
router.delete('/:id',[validarJWT], supplierController.deleteSupplier);



export default router;