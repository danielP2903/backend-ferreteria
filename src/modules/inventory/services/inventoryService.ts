import { IInventory } from '../../../common/interfaces/inventory';
import { DaoInventoryRepo } from '../repository/inventoryRepo';
import { IDetailPurchase } from '../../../common/interfaces/purchase';
import { ISaleDetail } from '../../../common/interfaces/sales';
export class InventoryService {
    private stockCurrent: number = 0;
    public async saveInventory(data: IInventory, transaction?: any) {

        const daoInventoryRepo = new DaoInventoryRepo();
        const res = await daoInventoryRepo.saveItem(data, transaction);
        return res;
    }

    public async addProductToInventory(data: IDetailPurchase[]) {
        const daoInventoryRepo = new DaoInventoryRepo();
        await data.map(async data => {
            const existInventory = await daoInventoryRepo.findByProduct(data.idProduct);
            if (!existInventory) { return new Error(`El producto ingresado con id: ${data.idProduct} no existe`) }
            const stockCurrent = existInventory.dataValues.stock + data.quantity;
            const resp = await daoInventoryRepo.addInventoryProduct(data.idProduct, stockCurrent);
            return resp;
        })
    }

    public async substractProductOfInventory(data: ISaleDetail[]) {
        const daoInventoryRepo = new DaoInventoryRepo();
        const arrayPromises = await data.map(async data => {
            this.stockCurrent = await this.findByProductAndStock(data.idProduct, data.quantityProduct);
            const newStock = this.stockCurrent - data.quantityProduct;
            await daoInventoryRepo.substractInventoryProduct(data.idProduct, newStock);
        })
        const resp = Promise.all(arrayPromises).then(datas => {
            console.log(datas);
        }).catch(err => this.errorInPromise(err));
        return resp;
    }


    public async findByProductAndStock(id: number, quantityProduct: number) {
        const daoInventoryRepo = new DaoInventoryRepo();
        const existInventory = await daoInventoryRepo.findByProduct(id);
        if (!existInventory) { throw new Error(`El producto ingresado con id: ${id} no existe`) }
        const stockCurrent = this.validStock(existInventory.dataValues, quantityProduct);
        return stockCurrent;
    }

    public validStock(inventory: IInventory, quantityProduct: number) {
        if (inventory.stock < quantityProduct) { throw new Error(`No hay unidades suficientes para el producto `) }
        return inventory.stock;
    }
    public errorInPromise(err: any) {
        throw new Error(err.message)
    }
}