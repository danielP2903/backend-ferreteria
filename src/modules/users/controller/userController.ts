import { Request, Response } from "express";
import ResponseExpress from '../../../common/adapters/responseExpress';
import { UserService } from '../services/userService';

export class UserController{
  public async getUser(_req:Request,res:Response){
    const responseExpress = new ResponseExpress();

    try {
      
      

      const userService = new UserService();
      const result = await userService.getUser();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
}

    public async createUser(req:Request,res:Response){
        const {body} = req;
        const responseExpress = new ResponseExpress();
    
        try {
          
          
    
          const userService = new UserService();
          const result = await userService.createUser(body);
          return responseExpress.successResponse(res, result);
        } catch (error) {
          return responseExpress.errorResponse(res, error as Error);
        }
    }
 
    public async deleteUser(req:Request, res: Response){
      const responseExpress = new ResponseExpress();
  
      const { id } = req.params;
      try {
       
  
        const userService = new UserService();
        const result = await userService.deleteUser(id as unknown as number);
        return responseExpress.successResponse(res, result);
      } catch (error) {
        return responseExpress.errorResponse(res, error as Error);
      }
    }
}