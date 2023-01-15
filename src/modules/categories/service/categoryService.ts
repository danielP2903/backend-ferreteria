import { ICategory } from '../../../common/interfaces/category';
import { DaoCategoryRepo } from '../repository/daoCategoryRepository';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
export class CategoryService{


    public async getCategories():Promise<ServiceResponse<ICategory>>{
        const daoCategory =  new DaoCategoryRepo();
        const res         =  await daoCategory.getItem();
        const result: ServiceResponse<ICategory> = {
            httpStatus: HttpStatus.OK,
            message: MessagesSuccess.CONSULT,
            listData: res,
          };
          return result;
    }

    public async saveCategory(data:ICategory):Promise<ServiceResponse<ICategory>>{
        const daoCategory = new DaoCategoryRepo();
        const res   =await daoCategory.saveItem(data);
        const result:ServiceResponse<ICategory> ={
            httpStatus:HttpStatus.CREATED,
            message:MessagesSuccess.CREATED,
            data:res.dataValues
        }
        return result;
    }
    public async updateCategory(data:ICategory):Promise<ServiceResponse<ICategory>>{
        const condition = { where: { idCategory: data.idCategory } };
        const daoCategory = new DaoCategoryRepo(condition);
        const existCategory = await daoCategory.findByName(data);

        if(existCategory){
            throw new Error("Ya existe la categoria con el nombre ingresado")
        }
        await daoCategory.updateItem(data);
        const result:ServiceResponse<ICategory> ={
            httpStatus:HttpStatus.OK,
            message:MessagesSuccess.UPDATED
        }
        return result;
    }
    public async deleteCategory(id:number):Promise<ServiceResponse<ICategory>>{
        const daoCategoryRepo = new DaoCategoryRepo();
        await daoCategoryRepo.deleteItem(id);

        const result: ServiceResponse<ICategory> = {
        httpStatus: HttpStatus.OK,
        message: MessagesSuccess.DELETED,
        };
        return result;
    }
}
