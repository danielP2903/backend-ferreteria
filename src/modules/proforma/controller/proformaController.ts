import { Request, Response } from 'express';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { ProformaService } from '../service/proformaService';
import dbConnection from '../../../common/dbConnection';

export class ProformaController{
  public async getProforma(req:Request,res:Response){
    const responseExpress = new ResponseExpress();
    const { body } = req;
    console.log(body);
    
    try {

      const proformaService = new ProformaService();
      const result = await proformaService.getProforma();
   

      
      return responseExpress.successResponse(res, result);
    } catch (error) {
  // await transaction.rollback();  
      return responseExpress.errorResponse(res, error as Error);
    }
  } 
    public async saveProforma(req:Request,res:Response){
        const responseExpress = new ResponseExpress();
        const transaction = await dbConnection.transaction();
        const { body } = req;
        console.log(body);
        
        try {
    
          const proformaService = new ProformaService();
          const result = await proformaService.saveProforma(body,transaction);
       
   
          await transaction.commit();
          
          return responseExpress.successResponse(res, result);
        } catch (error) {
      // await transaction.rollback();  
          return responseExpress.errorResponse(res, error as Error);
        }
      } 
      public async deleteProforma(req:Request, res: Response){
        const responseExpress = new ResponseExpress();
    
        const { id } = req.params;
        try {
         
    
          const proformaService = new ProformaService();
          const result = await proformaService.deleteProforma(id as unknown as number);
          return responseExpress.successResponse(res, result);
        } catch (error) {
          return responseExpress.errorResponse(res, error as Error);
        }
      }
}