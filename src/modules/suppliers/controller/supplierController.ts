import { Request, Response } from "express";
import ResponseExpress from "../../../common/adapters/responseExpress";
import { createSupplierJoiSchema,updateSupplierJoiSchema } from "../DTO/supplierDTO";
import { SupplierService } from "../service/supplierService";
import { JoiAdapter } from "../../../common/adapters/joiAdapter";

export class SupplierController {

  public async getSuppliers(_req: Request, res: Response) {
    const responseExpress = new ResponseExpress();

    try {
    
      
      const supplierService = new SupplierService();
      const result = await supplierService.getSuppliers();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }


  public async saveSupplier(req: Request, res: Response) {
    const responseExpress = new ResponseExpress();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(createSupplierJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const supplierService = new SupplierService();
      const result = await supplierService.saveSupplier(body);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }

  public async updateSupplier(req:Request, res: Response){
    const responseExpress = new ResponseExpress();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(updateSupplierJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const supplierService = new SupplierService();
      const result = await supplierService.updateSupplier(body);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}
