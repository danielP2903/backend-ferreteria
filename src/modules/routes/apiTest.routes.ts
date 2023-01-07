import { Router } from "express";
import { TestController } from '../controllers/testController';

const router = Router();


const testController = new TestController();

router.get('/',testController.testService);


export default router;