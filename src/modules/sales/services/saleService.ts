import { ServiceResponse } from "../../../common/interfaces/httpResponsesInterface";
import { HttpStatus } from "../../../utils/enums/httpStatusEnum";
import { MessagesSuccess } from "../../../utils/enums/messagesSuccessEnum";
import { ISale,ISalesHeader } from '../../../common/interfaces/sales';
import { DaoSaleRepository } from '../repository/saleRepository';
// import { SaleCalculation } from '../utils/saleCalculation';
import { SaleDetailService } from '../../salesDetail/services/saleDetailService';
export class SaleService {
  
  public async getSale():Promise<ServiceResponse<ISalesHeader>> {
    const daoSaleRepo = new DaoSaleRepository();
    const res = await daoSaleRepo.getItem();
    const result: ServiceResponse<ISalesHeader> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.CONSULT,
      listData: res,
    };
    return result;
  }

  public async saveSale(Sale: ISale,transaction:any):Promise<ServiceResponse<ISalesHeader>> {
    const daoSaleRepo = new DaoSaleRepository();
    const existByInvoice = await daoSaleRepo.validNumberInvoice(Sale.saleHeader.number);
    if(existByInvoice)throw new Error("Ya existe la compra con este numero de factura")
    Sale.saleHeader.date = new Date(Sale.saleHeader.date);
    // const saleCalculation = new SaleCalculation(Sale);
    // const calculationSale = saleCalculation.main();
    const res = await daoSaleRepo.saveItem(Sale.saleHeader,transaction);
    const saleDetailService = new SaleDetailService();
    const detailBuild =await  saleDetailService.buildObjectSaleDetail(Sale.saleDetail,res.dataValues.idSaleHeader);
   
    await saleDetailService.saveSaleDetail(detailBuild,transaction);
    const result: ServiceResponse<ISalesHeader> = {
      httpStatus: HttpStatus.CREATED,
      message: MessagesSuccess.CREATED,
      data: res.dataValues,
    };
    return result;
  }

//   public async updateSale(Sale: ISalesHeader):Promise<ServiceResponse<ISalesHeader>> {
//     const daoSaleRepo = new DaoSaleRepository();

//     const existByInvoice = await daoSaleRepo.validNumberInvoice(Sale.numberInvoice);
//     if(!existByInvoice)throw new Error("No existe la compra con este numero de factura")
    
   
//     const daoRepo = new DaoSaleRepository();
//     const res = await daoRepo.updatePersonalized(Sale.idSale,Sale.email);
//     console.log(res);
//     const result: ServiceResponse<ISalesHeader> = {
//       httpStatus: HttpStatus.OK,
//       message: MessagesSuccess.UPDATED,
//     };

//     return result;
//   }

  public async deleteSale(id:number):Promise<ServiceResponse<ISalesHeader>> {
    const daoSaleRepo = new DaoSaleRepository();
    await daoSaleRepo.deleteByStatus(id);

    const result: ServiceResponse<ISalesHeader> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.DELETED,
    };
    return result;
  }
}
