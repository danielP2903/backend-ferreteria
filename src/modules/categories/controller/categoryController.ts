import { Request, Response } from "express";
import { CategoryService } from '../service/categoryService';
import ResponseExpress from '../../../common/adapters/responseExpress';
import { createCategoryJoiSchema, updateCategoryJoiSchema } from "../DTO/categoryDTO";
import { JoiAdapter } from '../../../common/adapters/joiAdapter';

export class CategoryController{

    public async saveCategory(req:Request,res:Response){
        const responseExpress = new ResponseExpress();
        const { body } = req;
        try {
          const joiAdapter = new JoiAdapter(createCategoryJoiSchema);
    
          await joiAdapter.validate(body);
          const categoryService = new CategoryService();
          const result = await categoryService.saveCategory(body);
          return responseExpress.successResponse(res, result);
        } catch (error) {
          return responseExpress.errorResponse(res, error as Error);
        }
      } 

      public async updateCategory(req:Request,res:Response){
        const responseExpress = new ResponseExpress();
        const { body } = req;
        try {
          const joiAdapter = new JoiAdapter(updateCategoryJoiSchema);
    
          await joiAdapter.validate(body);
          const categoryService = new CategoryService();
          const result = await categoryService.updateCategory(body);
          return responseExpress.successResponse(res, result);
        } catch (error) {
          return responseExpress.errorResponse(res, error as Error);
        }
      } 
    }
