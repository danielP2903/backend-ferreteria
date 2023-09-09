import { Request, Response } from 'express';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { SaleDetailService } from '../services/saleDetailService';
export class SaleDetailController {
    public async getSaleDetail(req: Request, res: Response) {

        const responseExpress = new ResponseExpress();
        const {id} = req.params;
    
        try {
          const saleDetailService = new SaleDetailService();
          const result = await saleDetailService.getById(id as unknown as number);
          return responseExpress.successResponse(res, result);
        } catch (error) {
          return responseExpress.errorResponse(res, error as Error);
        }
      }
}