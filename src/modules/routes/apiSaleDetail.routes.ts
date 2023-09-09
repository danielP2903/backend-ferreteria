import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { SaleDetailController } from '../salesDetail/controller/saleDetailController';

const router = Router();


const saleDetailController = new SaleDetailController();
router.get('/:id',[validarJWT], saleDetailController.getSaleDetail);



export default router;