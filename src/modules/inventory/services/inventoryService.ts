import { IInventory } from '../../../common/interfaces/inventory';
import { DaoInventoryRepo } from '../repository/inventoryRepo';
import { IDetailPurchase } from '../../../common/interfaces/purchase';
export class InventoryService {

    public async saveInventory(data: IInventory, transaction?: any) {

        const daoInventoryRepo = new DaoInventoryRepo();
        const res = await daoInventoryRepo.saveItem(data, transaction);
        return res;
    }

    public async addProductToInventory(data: IDetailPurchase[]) {
        const daoInventoryRepo = new DaoInventoryRepo();
        await data.map(async data =>{
           const existInventory = await daoInventoryRepo.findByProduct(data.idProduct);
           if(!existInventory){return new Error("El producto ingresado no existe")}
           const stockCurrent = existInventory.dataValues.stock + data.quantity;
           const resp = await daoInventoryRepo.addInventoryProduct(data.idProduct,stockCurrent);
           return resp;
        })
    }   
}