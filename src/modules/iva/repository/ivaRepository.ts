import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Model } from 'sequelize';
import { IIVa } from '../../../common/interfaces/iva';
import { Iva } from '../../../common/schemas/iva-schema';
export class DaoIvaRepo extends DaoCrudGeneric<IIVa>{

    constructor(condition?:any){
        super(Iva as unknown as Model,condition)
    }
}
