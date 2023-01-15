
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { ISalesHeader } from '../../../common/interfaces/sales';
import { SaleHeader } from '../../../common/schemas/saleHeader-schema';


export class DaoSaleRepository extends DaoCrudGeneric<ISalesHeader>{

    constructor(condition?:any){
        super(SaleHeader as unknown as Model,condition)
    }

    public async validNumberInvoice(number:number){
       const res = await this.findByNumber(number);
        return res;
    }

    public async findByNumber(number:number){

        const result = await SaleHeader.findOne({where:{
            number
        }});
        return result;
    }

    public async updatePersonalized(idSaleHeader:number,email:string){
        const resp = await SaleHeader.update({email},{where:{idSaleHeader}});
        return resp;
    }

}