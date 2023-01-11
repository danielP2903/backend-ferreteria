import { ICategory } from '../../../common/interfaces/category';
import { DaoCategoryRepo } from '../repository/daoCategoryRepository';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
export class CategoryService{

    public async saveCategory(data:ICategory){
        const daoCategory = new DaoCategoryRepo();
        const res   =await daoCategory.saveCategory(data);
        const result:ServiceResponse<ICategory> ={
            httpStatus:HttpStatus.CREATED,
            data:res.dataValues,
            message:MessagesSuccess.CREATED
        }
        return result;
    }
    public async updateCategory(data:ICategory){
        const daoCategory = new DaoCategoryRepo();
        const existCategory = await daoCategory.findByName(data);

        if(existCategory){
            throw new Error("Ya existe la categoria con el nombre ingresado")
        }
        await daoCategory.updateCategory(data);
        const result:ServiceResponse<ICategory> ={
            httpStatus:HttpStatus.CREATED,
            message:MessagesSuccess.CREATED
        }
        return result;
    }
}
