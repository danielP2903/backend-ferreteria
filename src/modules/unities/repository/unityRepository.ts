import { IUnity } from '../../../common/interfaces/unity';
import DaoCrudGeneric from '../../../common/adapters/dao-crud-generic-repo';
import { Unity } from '../../../common/schemas/unity-schema';
import { Model } from 'sequelize';
export class DaoUnityRepo extends DaoCrudGeneric<IUnity>{

    constructor(condition?:any){
        super(Unity as unknown as Model,condition)
    }
}
