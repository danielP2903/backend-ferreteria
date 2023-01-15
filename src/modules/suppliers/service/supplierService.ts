import { ISupplier } from "../../../common/interfaces/supplier";
import { DaoSupplerRepository } from "../repository/daoSupplierRepository";
import { ServiceResponse } from "../../../common/interfaces/httpResponsesInterface";
import { HttpStatus } from "../../../utils/enums/httpStatusEnum";
import { MessagesSuccess } from "../../../utils/enums/messagesSuccessEnum";
export class SupplierService {
  
  public async getSuppliers():Promise<ServiceResponse<ISupplier>> {
    const daoSupplierRepo = new DaoSupplerRepository();
    const res = await daoSupplierRepo.getItem();
    const result: ServiceResponse<ISupplier> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.CONSULT,
      listData: res,
    };
    return result;
  }

  public async saveSupplier(supplier: ISupplier):Promise<ServiceResponse<ISupplier>> {
    const daoSupplierRepo = new DaoSupplerRepository();
    await daoSupplierRepo.validExistSupplier(supplier.name,supplier.ruc);
    const res = await daoSupplierRepo.saveItem(supplier);
    const result: ServiceResponse<ISupplier> = {
      httpStatus: HttpStatus.CREATED,
      message: MessagesSuccess.CREATED,
      data: res.dataValues,
    };
    return result;
  }

  public async updateSupplier(supplier: ISupplier):Promise<ServiceResponse<ISupplier>> {
    const daoSupplierRepo = new DaoSupplerRepository();

    const isDataEqualSupplier = await daoSupplierRepo.dataEqualUpdate(
      supplier.idSupplier
    );

    if (isDataEqualSupplier.ruc != supplier.ruc) {
      await daoSupplierRepo.findByRuc(supplier.ruc);
    }
    if (isDataEqualSupplier.name != supplier.name) {
      await daoSupplierRepo.findByName(supplier.name);
    }
    const condition = { where: { idSupplier: supplier.idSupplier } };
    const daoRepo = new DaoSupplerRepository(condition);
    const res = await daoRepo.updateItem(supplier);
    console.log(res);
    const result: ServiceResponse<ISupplier> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.UPDATED,
    };

    return result;
  }

  public async deleteSupplier(id:number):Promise<ServiceResponse<ISupplier>> {
    const daoSupplierRepo = new DaoSupplerRepository();
    await daoSupplierRepo.deleteItem(id);

    const result: ServiceResponse<ISupplier> = {
      httpStatus: HttpStatus.OK,
      message: MessagesSuccess.DELETED,
    };
    return result;
  }
}
