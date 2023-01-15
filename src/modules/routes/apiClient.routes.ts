import { Router } from "express";
import {ClientController} from '../clients/controller/clientController';

const router = Router();

const clientController = new ClientController();

router.post('/', clientController.saveClient);
router.put('/:identification',clientController.updateClient);
router.get('/',clientController.listClients);
router.delete('/:id',clientController.deleteClient);

export default router;