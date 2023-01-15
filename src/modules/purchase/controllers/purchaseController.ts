import { Request, Response } from "express";
import ResponseExpress from "../../../common/adapters/responseExpress";
import { JoiAdapter } from "../../../common/adapters/joiAdapter";
import { PurchaseService } from '../services/purchaseService';
import { createPurchaseJoiSchema, updatePurchaseHeaderJoiSchema } from "../DTO/purchaseDTO";
import dbConnection from '../../../common/dbConnection';

export class PurchaserController {

  public async getPurchase(_req: Request, res: Response) {

    const responseExpress = new ResponseExpress();


    try {
      const purchaseService = new PurchaseService();
      const result = await purchaseService.getPurchase();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }


  public async savePurchase(req: Request, res: Response) {
    const responseExpress = new ResponseExpress();
    const t = await dbConnection.transaction();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(createPurchaseJoiSchema);
      
      await joiAdapter.validate(body);
      

      const purchaseService = new PurchaseService();
      const result = await purchaseService.savePurchase(body,t);
      await t.commit();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      await t.rollback();
      return responseExpress.errorResponse(res, error as Error);
    }
  }

  public async updatePurchase(req:Request, res: Response){
    const responseExpress = new ResponseExpress();
    const t = await dbConnection.transaction();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(updatePurchaseHeaderJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const purchaseService = new PurchaseService();
      const result = await purchaseService.updatePurchase(body);
      await t.commit();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      await t.rollback();
      return responseExpress.errorResponse(res, error as Error);
    }
  }
  public async deletePurchase(req:Request, res: Response){
    const responseExpress = new ResponseExpress();

    const { id } = req.params;
    try {
     

      const purchaseService = new PurchaseService();
      const result = await purchaseService.deletePurchase(id as unknown as number);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}
