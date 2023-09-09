import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { ProformaController } from '../proforma/controller/proformaController';

const router = Router();


const proformaController = new ProformaController();
router.get('/',[validarJWT], proformaController.getProforma);
router.post('/',[validarJWT], proformaController.saveProforma);
router.delete('/',[validarJWT], proformaController.deleteProforma);


export default router;