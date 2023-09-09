import DaoCrudGeneric from '../../common/adapters/dao-crud-generic-repo';
import { ProformaDetail } from '../../common/interfaces/proforma';
import { Model } from 'sequelize';
import { DetailProforma } from '../../common/schemas/detailProforma-schema';
export class ProformaDetailRepository extends DaoCrudGeneric<ProformaDetail>{
    constructor(condition?:any){
        super(DetailProforma as unknown as Model,condition)
    }

     
    public async saveMultipleDetails(data:any[],t:any){
        await DetailProforma.bulkCreate(data,{transaction:t})
        
    }
}