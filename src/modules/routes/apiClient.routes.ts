import { Router } from "express";
import { validarJWT } from "../auth/validar-token";
import {ClientController} from '../clients/controller/clientController';

const router = Router();

const clientController = new ClientController();

router.post('/',[validarJWT], clientController.saveClient);
router.put('/:identification',[validarJWT],clientController.updateClient);
router.get('/',[validarJWT],clientController.listClients);
router.delete('/:id',[validarJWT],clientController.deleteClient);

export default router;