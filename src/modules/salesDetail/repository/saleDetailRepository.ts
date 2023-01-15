
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { ISaleDetail } from '../../../common/interfaces/sales';
import { DetailSale } from '../../../common/schemas/detailSale-schema';

export class DaoSaleDetailRepository extends DaoCrudGeneric<ISaleDetail>{

    constructor(condition?:any){
        super(DetailSale as unknown as Model,condition)
    }

  
    public async saveMultipleDetails(data:any[],t:any){
        await DetailSale.bulkCreate(data,{transaction:t})
        
    }

}