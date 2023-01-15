import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { IProduct } from '../../../common/interfaces/product';
import { Products } from '../../../common/schemas/product-schema';

export class DaoProductsRepo extends DaoCrudGeneric<IProduct>{

    constructor(condition?:any){
        super(Products as unknown as Model,condition)
    }
    public async validExistProduct(data:IProduct){
        const res = await this.findByName(data.name);
        return res;
     }
    public async findByName(name:string){

        const item = await Products.findOne({where:{name:name}});
        return item;
    }
}