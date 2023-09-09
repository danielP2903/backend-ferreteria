import { Request, Response } from 'express';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { PurchaseDetailService } from '../services/purchaseDetailService';
export class PurchaseDetailController{
  public async   getPurchaseDetailByIdPurchase(req: Request, res: Response){
    const responseExpress = new ResponseExpress();
    const {id} = req.params;

    try {
      const purchaseDetailService = new PurchaseDetailService();
      const result = await purchaseDetailService.getById(id as unknown as number);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
    }
