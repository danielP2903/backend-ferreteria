import { Request, Response } from "express";
import ResponseExpress from "../../../common/adapters/responseExpress";
import { JoiAdapter } from "../../../common/adapters/joiAdapter";
import { ProductsService } from "../services/productService";
import { createProductJoiSchema, updateProductJoiSchema } from "../DTO/productDTO";

export class ProductsController {

  public async getProducts(_req: Request, res: Response) {

    const responseExpress = new ResponseExpress();


    try {
      const productsService = new ProductsService();
      const result = await productsService.getProducts();
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }


  public async saveProduct(req: Request, res: Response) {
    const responseExpress = new ResponseExpress();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(createProductJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const productsService = new ProductsService();
      const result = await productsService.saveProducts(body);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }

  public async updateProduct(req:Request, res: Response){
    const responseExpress = new ResponseExpress();

    const { body } = req;
    try {
      const joiAdapter = new JoiAdapter(updateProductJoiSchema);

      const _data = await joiAdapter.validate(body);
      console.log(_data);

      const productsService = new ProductsService();
      const result = await productsService.updateProducts(body);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
  public async deleteProduct(req:Request, res: Response){
    const responseExpress = new ResponseExpress();

    const { id } = req.params;
    try {
     

      const productsService = new ProductsService();
      const result = await productsService.deleteProducts(id as unknown as number);
      return responseExpress.successResponse(res, result);
    } catch (error) {
      return responseExpress.errorResponse(res, error as Error);
    }
  }
}
