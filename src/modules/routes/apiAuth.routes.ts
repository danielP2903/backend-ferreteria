import { Router } from "express";
import { AuthController } from '../auth/controller/authController';

const router = Router();


const authController = new AuthController();
router.post('/', authController.generateToken);



export default router;