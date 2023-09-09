import { Response,Request } from 'express';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { IvaService } from '../service/ivaService';
export class IvaController{
    
  public async getIva(req: Request, res: Response) {

    const responseExpress = new ResponseExpress();
    console.log(req);
    

    try {
      const ivaService = new IvaService();
      const result = await ivaService.getIva();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}