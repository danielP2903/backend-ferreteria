import { Request, Response } from "express";
import ResponseExpress from "../../../common/adapters/responseExpress";
import { JoiAdapter } from "../../../common/adapters/joiAdapter";
import dbConnection from '../../../common/dbConnection';
import { SaleService } from '../services/saleService';
import { createSaleJoiSchema } from "../DTO/saleDTO";

export class SalesController {

  public async getSales(_req: Request, res: Response) {

    const responseExpress = new ResponseExpress();


    try {
      const salesService = new SaleService();
      const result = await salesService.getSale();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }


  public async saveSale(req: Request, res: Response) {

    const transaction = await dbConnection.transaction();
    const responseExpress = new ResponseExpress();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(createSaleJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const salesService = new SaleService();
      const result = await salesService.saveSale(body,transaction);
      await transaction.commit();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      await transaction.rollback();  
      return responseExpress.errorResponse(res, error as Error);
    }
  }

//   public async updateProduct(req:Request, res: Response){
//     const responseExpress = new ResponseExpress();

//     const { body } = req;
//     try {
//       const joiAdapter = new JoiAdapter(updateProductJoiSchema);

//       const _data = await joiAdapter.validate(body);
//       console.log(_data);

//       const salesService = new SalesService();
//       const result = await salesService.updateSales(body);
//       return responseExpress.successResponse(res, result);
//     } catch (error) {
//       return responseExpress.errorResponse(res, error as Error);
//     }
//   }

  public async deleteSale(req:Request, res: Response){
    const responseExpress = new ResponseExpress();

    const { id } = req.params;
    try {
     

      const salesService = new SaleService();
      const result = await salesService.deleteSale(id as unknown as number);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}
