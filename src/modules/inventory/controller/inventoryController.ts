import { Request, Response } from "express";
import ResponseExpress from "../../../common/adapters/responseExpress";
import { InventoryService } from '../services/inventoryService';

export class InventoryController {

  public async getInventory(_req: Request, res: Response) {

    const responseExpress = new ResponseExpress();


    try {
      const inventoryService = new InventoryService();
      const result = await inventoryService.getInventory();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}