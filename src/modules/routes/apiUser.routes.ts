import { Router } from "express";
import { UserController } from '../users/controller/userController';

const router = Router();


const userController = new UserController();
router.post('/', userController.createUser);
router.get('/', userController.getUser);

router.delete('/:id', userController.deleteUser);


export default router;