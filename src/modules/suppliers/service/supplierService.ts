import { ISupplier } from '../../../common/interfaces/supplier';
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Supplier } from '../../../common/schemas/supplier-schema';
import { Model } from 'sequelize';
import { DaoSupplerRepository } from '../repository/daoSupplierRepository';
import { ServiceResponse } from '../../../common/interfaces/httpResponsesInterface';
import { HttpStatus } from '../../../utils/enums/httpStatusEnum';
import { MessagesSuccess } from '../../../utils/enums/messagesSuccessEnum';
export class SupplierService{

    public async getSuppliers(){

        const daoSupplierRepo =  new DaoSupplerRepository();
     
        const res        = await daoSupplierRepo.getSuppliers();    
        const result:ServiceResponse<ISupplier> ={
            httpStatus:HttpStatus.OK,
            listData:res,
            message:MessagesSuccess.CONSULT
        }
        return result;
    }

    public async saveSupplier(supplier:ISupplier){

        const daoSupplierRepo =  new DaoSupplerRepository(supplier);
        await daoSupplierRepo.validExistSupplier();
        const daoGeneric = new DaoCrudGeneric<ISupplier>(Supplier as unknown as Model);
        const res        = await daoGeneric.saveItem(supplier);
        const result:ServiceResponse<ISupplier> ={
            httpStatus:HttpStatus.CREATED,
            data:res.dataValues,
            message:MessagesSuccess.CREATED
        }
        return result;
    }

    public async updateSupplier(supplier:ISupplier){
        const daoSupplierRepo =  new DaoSupplerRepository(supplier);

        const isDataEqualSupplier =await daoSupplierRepo.dataEqualUpdate(supplier.idSupplier); 

        if(isDataEqualSupplier.ruc != supplier.ruc){
            await daoSupplierRepo.findByRuc(supplier.ruc);
        }
        if(isDataEqualSupplier.name != supplier.name){
            await daoSupplierRepo.findByName(supplier.name);
        }

        // const daoGeneric = new DaoCrudGeneric<ISupplier>(Supplier as unknown as Model);
        const res        = await daoSupplierRepo.updateSupplier(supplier);
        console.log(res);
        
        const result:ServiceResponse<ISupplier> ={
            httpStatus:HttpStatus.OK,
            message:MessagesSuccess.UPDATED
        }

        return result;
    }
}