import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { Inventory } from '../../../common/schemas/inventory-schema';
import { IInventory } from '../../../common/interfaces/inventory';

export class DaoInventoryRepo extends DaoCrudGeneric<IInventory>{

    constructor(condition?:any){
        super(Inventory as unknown as Model,condition)
    }
    

    public async findByProduct(idProduct:number){
        const inventory = await Inventory.findOne({where:{idProduct}})
        return inventory;
    }

    public async addInventoryProduct(idProduct:number,stock:number){
        try {
         await Inventory.update({stock:stock},{where:{idProduct}})
        } catch (error) {
            throw new Error("ha ocurrido un error al intentar actualizar el inventario")
        }
        
    }

    public async substractInventoryProduct(idProduct:number,stock:number){
        try {
            await Inventory.update({stock:stock},{where:{idProduct}})
           } catch (error) {
               throw new Error("ha ocurrido un error al intentar actualizar el inventario")
           }
    }

    public async updateDescription(description:string,idProduct:number){
        try {
            await Inventory.update({description:`control de cantidades para : ${description}`},{where:{idProduct}})
           } catch (error) {
               throw new Error("ha ocurrido un error al intentar actualizar el inventario")
           }
    }
}