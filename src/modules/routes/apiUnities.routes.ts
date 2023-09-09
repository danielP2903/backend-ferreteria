import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import { UnityController } from '../unities/controllers/unityController';

const router = Router();


const unityController = new UnityController();
router.get('/',[validarJWT], unityController.getUnities);
router.post('/');
router.put('/');
router.delete('/:id');



export default router;