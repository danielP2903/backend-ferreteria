import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { InventoryController } from '../inventory/controller/inventoryController';

const router = Router();


const inventoryController = new InventoryController();
router.get('/',[validarJWT], inventoryController.getInventory);



export default router;