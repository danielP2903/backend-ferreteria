import { InventoryService } from '../../inventory/services/inventoryService';
import { ProductsService } from '../../products/services/productService';
import { ISaleDetail } from '../../../common/interfaces/sales';
import { DaoSaleDetailRepository } from '../repository/saleDetailRepository';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
export class SaleDetailService {

    public async buildObjectSaleDetail(data: ISaleDetail[], idSaleHeader: number) {
        data.map(data => data.idSaleHeader = idSaleHeader);
        return data;
    }

    public async saveSaleDetail(data: ISaleDetail[],transaction:any) {

        const daoDetailSale = new DaoSaleDetailRepository();
        const inventoryService  = new InventoryService();
        const productService = new ProductsService();
        const arrayPromises = await data.map(async data => {
            await productService.findProductById(data.idProduct);
        })
        const resp = Promise.all(arrayPromises).then(async datas => {
            console.log(datas);
            await daoDetailSale.saveMultipleDetails(data,transaction);
            await inventoryService.substractProductOfInventory(data).catch(err => this.errorInPromise(err));
        }).catch(err => this.errorInPromise(err))
        console.log(resp);
        return resp;
    }

    
    public errorInPromise(err: any) {
        throw new Error(err.message)
    }

    public async getById(id:number):Promise<any>{
        const daoDetailSale = new DaoSaleDetailRepository();
        const res = await  daoDetailSale.getByIdSale(id);

        const result: ServiceResponse<ISaleDetail> = {
            httpStatus: HttpStatus.OK,
            message: MessagesSuccess.CONSULT,
            listData: res as unknown as ISaleDetail[],
          };
          return result;
    }
}