import { ServiceResponse } from "../../../common/interfaces/httpResponsesInterface";
import { HttpStatus } from "../../../utils/enums/httpStatusEnum";
import { MessagesSuccess } from "../../../utils/enums/messagesSuccessEnum";
import { IPurchaseHeader, IPurchase } from '../../../common/interfaces/purchase';
import { DaoPurchaseRepository } from '../repository/purchaseRepository';
import { PurchaseDetailService } from '../../purchaseDetail/services/purchaseDetailService';
import { PurchaseCalculation } from '../utils/purchaseCalculation';
export class PurchaseService {
  
  public async getPurchase():Promise<ServiceResponse<IPurchaseHeader>> {
    const daoPurchaseRepo = new DaoPurchaseRepository();
    const res = await daoPurchaseRepo.getItem();
    const result: ServiceResponse<IPurchaseHeader> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.CONSULT,
      listData: res,
    };
    return result;
  }

  public async savePurchase(purchase: IPurchase,transaction:any):Promise<ServiceResponse<IPurchaseHeader>> {
    const daoPurchaseRepo = new DaoPurchaseRepository();
    const existByInvoice = await daoPurchaseRepo.validNumberInvoice(purchase.purchase.numberInvoice);
    if(existByInvoice)throw new Error("Ya existe la compra con este numero de factura")
    purchase.purchase.date = new Date(purchase.purchase.date);
    const purchaseCalculation = new PurchaseCalculation(purchase);
    const calculationPurchase = purchaseCalculation.main();
    const res = await daoPurchaseRepo.saveItem(calculationPurchase.purchase,transaction);
    const purchaseDetailService = new PurchaseDetailService();
    const detailBuild =await  purchaseDetailService.buildObjectPurchaseDetail(purchase.purchaseDetail,res.dataValues.idPurchaseHeader);
    await purchaseDetailService.savePurchaseDetail(detailBuild,transaction);
    const result: ServiceResponse<IPurchaseHeader> = {
      httpStatus: HttpStatus.CREATED,
      message: MessagesSuccess.CREATED,
      data: res.dataValues,
    };
    return result;
  }

  public async updatePurchase(purchase: IPurchaseHeader):Promise<ServiceResponse<IPurchaseHeader>> {
    const daoPurchaseRepo = new DaoPurchaseRepository();

    const existByInvoice = await daoPurchaseRepo.validNumberInvoice(purchase.numberInvoice);
    if(!existByInvoice)throw new Error("No existe la compra con este numero de factura")
    
   
    const daoRepo = new DaoPurchaseRepository();
    const res = await daoRepo.updatePersonalized(purchase.idPurchase,purchase.email);
    console.log(res);
    const result: ServiceResponse<IPurchaseHeader> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.UPDATED,
    };

    return result;
  }

  public async deletePurchase(id:number):Promise<ServiceResponse<IPurchaseHeader>> {
    const daoPurchaseRepo = new DaoPurchaseRepository();
    await daoPurchaseRepo.deleteItem(id);

    const result: ServiceResponse<IPurchaseHeader> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.DELETED,
    };
    return result;
  }
}
