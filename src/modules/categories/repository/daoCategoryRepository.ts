import { Category } from "../../../common/schemas/category-schema";
import { ICategory } from '../../../common/interfaces/category';
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model, } from 'sequelize';

export class DaoCategoryRepo extends DaoCrudGeneric<ICategory>{

    constructor(condition?:any){
        super(Category as unknown as Model,condition)
    }
    public async findByName(category:ICategory){      
        const item = await Category.findOne({where:{name:category.name}});
        return item;
    }
}