import { Request, Response } from "express";
import { AuthService } from '../services/authService';
import ResponseExpress from '../../../common/adapters/responseExpress';

export class AuthController{
    public async generateToken(req:Request,res:Response){
        const responseExpress = new ResponseExpress();
        const {body} = req;
        try {
            const authService = new AuthService();
            const result = await authService.generateToken(body);
            return responseExpress.successResponse(res, result);
          } catch (error) {
            return responseExpress.errorResponse(res, error as Error);
          }
    }
}