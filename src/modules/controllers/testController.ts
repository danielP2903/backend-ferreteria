import { Request, Response } from "express";
import ResponseExpress from '../../common/adapter/responseExpress';
import TestService from '../services/testService';

export class TestController{
    
    public async testService(_req:Request, res:Response){
        const responseExpress = new ResponseExpress();

        try {
            const service =  new TestService();
            const result = await service.getTest();
            return responseExpress.successResponse(res,result)
        } catch (error) {
            return responseExpress.errorResponse(res,error as Error);
        }
    }
}