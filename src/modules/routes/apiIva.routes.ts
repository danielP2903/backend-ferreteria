import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { IvaController } from '../iva/controller/ivaController';

const router = Router();


const ivaController = new IvaController();
router.get('/',[validarJWT], ivaController.getIva);
router.post('/');
router.put('/');
router.delete('/:id');



export default router;