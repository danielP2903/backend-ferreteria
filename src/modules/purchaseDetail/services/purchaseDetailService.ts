import { IDetailPurchase } from '../../../common/interfaces/purchase';
import { DaoPurchaseDetailRepository } from '../repositorys/purchaseDetailRepository';
import { InventoryService } from '../../inventory/services/inventoryService';
import { ProductsService } from '../../products/services/productService';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
export class PurchaseDetailService {

    public async buildObjectPurchaseDetail(data: IDetailPurchase[], idPurchaseHeader: number) {
        data.map(data => data.idPurchaseHeader = idPurchaseHeader);
        return data;
    }

    public async savePurchaseDetail(data: IDetailPurchase[],transaction:any) {

        const daoDetailPurchase = new DaoPurchaseDetailRepository();
        const inventoryService  = new InventoryService();
        const productService = new ProductsService();
        const arrayPromises = await data.map(async data => {
            await productService.findProductById(data.idProduct);
        })
        const resp = Promise.all(arrayPromises).then(async datas => {
            console.log(datas);
            await daoDetailPurchase.saveMultipleDetails(data,transaction);
            await inventoryService.addProductToInventory(data);
        }).catch(err => this.errorInPromise(err))
        console.log(resp);
        return resp;
    }
    public errorInPromise(err: any) {
        throw new Error(err.message)
    }

    public async getById(id:number):Promise<any>{
        const daoDetailPurchase = new DaoPurchaseDetailRepository();
        const res = await  daoDetailPurchase.getByIdPurchase(id);

        const result: ServiceResponse<IDetailPurchase> = {
            httpStatus: HttpStatus.OK,
            message: MessagesSuccess.CONSULT,
            listData: res as unknown as IDetailPurchase[],
          };
          return result;
    }
}