import { IInventory } from '../../../common/interfaces/inventory';
export class OperationsInventory{
    
    public buildObjectCreateInventory(idProduct:number,name:string):IInventory{

        const inventory:IInventory = {
            stock:0,
            description:`control de cantidades para :${name}`,
            status:"ACTIVO",
            idProduct
        }

        return inventory;
    }
}