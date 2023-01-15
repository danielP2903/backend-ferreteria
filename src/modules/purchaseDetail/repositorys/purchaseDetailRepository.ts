
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { IDetailPurchase } from '../../../common/interfaces/purchase';
import { DetailPurchase } from '../../../common/schemas/detailPurchase-schema';

export class DaoPurchaseDetailRepository extends DaoCrudGeneric<IDetailPurchase>{

    constructor(condition?:any){
        super(DetailPurchase as unknown as Model,condition)
    }

  
    public async saveMultipleDetails(data:any[],t:any){
        await DetailPurchase.bulkCreate(data,{transaction:t})
        
    }

}