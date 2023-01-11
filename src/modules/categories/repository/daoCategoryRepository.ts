import { Category } from "../../../common/schemas/category-schema";
import { ICategory } from '../../../common/interfaces/category';

export class DaoCategoryRepo{

    public async saveCategory(data:any){
        const item = await Category.create(data);
        return item;
    }
    public async updateCategory(data:any){
        const item = await Category.update(data,{where:{idCategory:data.idCategory}});
        return item;
    }

    public async findByName(category:ICategory){

        const item = await Category.findOne({where:{name:category.name}});
        return item;
    }
}