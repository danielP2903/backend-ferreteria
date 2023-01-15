
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { PurchaseHeader } from "../../../common/schemas/purchaseHeader-schema";
import { IPurchaseHeader } from '../../../common/interfaces/purchase';

export class DaoPurchaseRepository extends DaoCrudGeneric<IPurchaseHeader>{

    constructor(condition?:any){
        super(PurchaseHeader as unknown as Model,condition)
    }

    public async validNumberInvoice(numberInvoice:number){
       const res = await this.findByNumberInvoice(numberInvoice);
        return res;
    }

    public async findByNumberInvoice(numberInvoice:number){

        const result = await PurchaseHeader.findOne({where:{
            numberInvoice
        }});
        return result;
    }

    public async updatePersonalized(idPurchaseHeader:number,email:string){
        const resp = await PurchaseHeader.update({email},{where:{idPurchaseHeader}});
        return resp;
    }

}