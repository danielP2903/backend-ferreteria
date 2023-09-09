import { DocumentEs } from '../../common/interfaces/document_es';
import DaoCrudGeneric from '../../common/adapters/dao-crud-generic-repo';
import { DocumentES } from '../../common/schemas/documentEs-Schema';
import { Model } from 'sequelize';
export class DocumentEsRepo extends DaoCrudGeneric<DocumentEs>{
    constructor(condition?:any){
        super(DocumentES as unknown as Model,condition)
    }

    async saveMultipleItems(data:any[],transactional:any){
        const item = await DocumentES.bulkCreate(data,{transaction:transactional});
        return item;
    }   


}